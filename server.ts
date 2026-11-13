import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI SDK with required telemetry header
const rawKey = process.env.GEMINI_API_KEY;
const isRealKey = rawKey && rawKey !== 'MY_GEMINI_API_KEY' && !rawKey.startsWith('MY_');
const ai = isRealKey
  ? new GoogleGenAI({
      apiKey: rawKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// POST /api/ai/generate-campaign
app.post('/api/ai/generate-campaign', async (req, res) => {
  const { prompt, tone = 'technical', needType = 'campaign' } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // If Gemini API is available and real, generate via gemini-3.8-flash with timeout
  if (ai) {
    try {
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Craft an award-winning editorial campaign and poster structure for GDG on Campus at National Forensic Sciences University (NFSU), Gandhinagar.
Event goal / brief: "${prompt}"
Requested Tone: ${tone}
Event category: ${needType}

Ensure all copy is authentic, punchy, sophisticated, and tailored to NFSU's specialized cyber forensics and developer culture.
Return the structured data matching the schema.`,
        config: {
          systemInstruction: `You are an elite creative director at a leading brand agency crafting identity and event campaign posters for Google Developer Groups (GDG) on Campus at National Forensic Sciences University (NFSU), Gandhinagar, Gujarat.
NFSU is India's premier institution of national importance specializing in Forensic Sciences, Cyber Security, Digital Forensics, Cryptography, and Advanced Technologies.
GDG on Campus NFSU is a high-conviction student community that explores technology, builds real-world software & security tools, solves sovereign problems, and competes in hackathons.
Write sharp, inspiring, non-cliché copy. Avoid generic AI buzzwords or cartoon tropes.`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING, description: 'Capitalized punchy headline, e.g. THE SIGNAL — NFSU BUILDERS' },
              subtitle: { type: Type.STRING, description: '1-sentence evocative value proposition' },
              kicker: { type: Type.STRING, description: 'Uppercase short category kicker, e.g. ADVANCED FORENSIC WORKSHOP' },
              foundingManifesto: { type: Type.STRING, description: 'Short philosophical quote, e.g. In security, theory is an assumption. Code is proof.' },
              cycleTagline: { type: Type.STRING, description: '4 action verbs separated by dots, e.g. Inspect · Build · Hack · Defend' },
              pillar1Title: { type: Type.STRING, description: 'Track 01 title' },
              pillar1Desc: { type: Type.STRING, description: 'Track 01 short description' },
              pillar2Title: { type: Type.STRING, description: 'Track 02 title' },
              pillar2Desc: { type: Type.STRING, description: 'Track 02 short description' },
              pillar3Title: { type: Type.STRING, description: 'Track 03 title' },
              pillar3Desc: { type: Type.STRING, description: 'Track 03 short description' },
              pillar4Title: { type: Type.STRING, description: 'Track 04 title' },
              pillar4Desc: { type: Type.STRING, description: 'Track 04 short description' },
              ctaText: { type: Type.STRING, description: 'Primary call to action' },
              subCtaText: { type: Type.STRING, description: 'Secondary action' },
              hashtag: { type: Type.STRING, description: 'Community hashtag with # prefix' },
              dateTime: { type: Type.STRING, description: 'Date and schedule string' },
              venue: { type: Type.STRING, description: 'Campus venue at NFSU Gandhinagar' },
              recommendedTheme: { type: Type.STRING, description: 'One of: swiss, cyber, google, riso, monolith' },
              recommendedImage: { type: Type.STRING, description: 'One of: campus_night, campus_day, campus_aerial, forensics, monolith, acoustic, obsidian' },
              creativeRationale: { type: Type.STRING, description: 'Brief 2-sentence rationale for this design and copy direction' },
            },
            required: [
              'headline',
              'subtitle',
              'kicker',
              'foundingManifesto',
              'cycleTagline',
              'pillar1Title',
              'pillar1Desc',
              'pillar2Title',
              'pillar2Desc',
              'pillar3Title',
              'pillar3Desc',
              'pillar4Title',
              'pillar4Desc',
              'ctaText',
              'subCtaText',
              'hashtag',
              'dateTime',
              'venue',
              'recommendedTheme',
              'recommendedImage',
              'creativeRationale'
            ]
          }
        }
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI generation timed out')), 5000)
      );

      const response: any = await Promise.race([generatePromise, timeoutPromise]);
      const responseText = response?.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, data: parsed, source: 'gemini' });
      }
    } catch (err: any) {
      console.warn('Gemini API call failed or timed out, falling back to local synthesizer:', err?.message || err);
    }
  }

  // Graceful Intelligent Fallback Synthesizer for offline / quota cases
  const isSecurity = /ctf|security|hack|forensic|exploit|defense|cyber|malware|reverse/i.test(prompt);
  const isCloud = /cloud|vertex|ai|machine learning|gemini|llm|data|deep/i.test(prompt);
  const isApp = /android|flutter|mobile|ios|web|fullstack|react/i.test(prompt);

  const fallbackData = {
    headline: isSecurity
      ? `CYBERSTRIKE — ${prompt.toUpperCase().slice(0, 32)}`
      : isCloud
      ? `FRONTIER AI — ${prompt.toUpperCase().slice(0, 32)}`
      : `THE SIGNAL — ${prompt.toUpperCase().slice(0, 32)}`,
    subtitle: `An advanced initiative by GDG on Campus NFSU exploring ${prompt}.`,
    kicker: isSecurity ? 'SPECIALIZED CYBER SPRINT' : 'HANDS-ON BUILDER COHORT',
    foundingManifesto: isSecurity
      ? "In digital defense, assumptions fail. Verified systems endure."
      : "Ideas don't build themselves. People do.",
    cycleTagline: isSecurity
      ? 'Decompile · Exploit · Patch · Defend'
      : 'Architect · Code · Benchmark · Ship',
    pillar1Title: isSecurity ? 'Reverse Engineering' : 'Core Architecture',
    pillar1Desc: isSecurity ? 'Static and dynamic binary inspection' : 'High-throughput system primitives',
    pillar2Title: isSecurity ? 'Forensic Telemetry' : 'Applied AI Models',
    pillar2Desc: isSecurity ? 'Packet artifacts & memory extraction' : 'Integrating frontier reasoning APIs',
    pillar3Title: isSecurity ? 'Sovereign Hardening' : 'Developer Projects',
    pillar3Desc: isSecurity ? 'Kernel level exploit mitigations' : 'Open-source production repositories',
    pillar4Title: 'Community & Mentorship',
    pillar4Desc: 'Peer cohorts & technical guidance at NFSU',
    ctaText: 'Be part of something bigger.',
    subCtaText: 'Join GDG on Campus NFSU Gandhinagar',
    hashtag: '#GDGonNFSU',
    dateTime: 'UPCOMING SESSION · 14:00 IST',
    venue: isSecurity ? 'Cyber Defense Range, NFSU Campus' : 'HPC Auditorium, NFSU Gandhinagar',
    recommendedTheme: isSecurity ? 'cyber' : isCloud ? 'google' : 'swiss',
    recommendedImage: isSecurity ? 'forensics' : 'campus_night',
    creativeRationale: 'Constructed using NFSU institutional domain knowledge to balance technical depth with typographic clarity.'
  };

  return res.json({ success: true, data: fallbackData, source: 'synthesizer' });
});

const isConfiguredEnv = (val?: string) =>
  Boolean(val && val.trim() !== '' && !val.startsWith('MY_') && !val.includes('YOUR_'));

const ALLOWED_IMAGE_PROXY_HOSTS = new Set([
  'images.unsplash.com',
  'upload.wikimedia.org',
  'thumb.wikimedia.org',
  'images.pexels.com',
  'cdn.pixabay.com',
  'pixabay.com'
]);

const WIKIMEDIA_USER_AGENT =
  'GDGOnCampusNFSUPosterStudio/1.0 (https://gdg.community.dev; student-studio@nfsu.ac.in)';

// GET /api/images/sources — transparent provider capability check (keys stay strictly server-side)
app.get('/api/images/sources', (_req, res) => {
  const unsplashConfigured = isConfiguredEnv(process.env.UNSPLASH_ACCESS_KEY);
  const pexelsConfigured = isConfiguredEnv(process.env.PEXELS_API_KEY);
  const pixabayConfigured = isConfiguredEnv(process.env.PIXABAY_API_KEY);

  res.json({
    providers: [
      {
        id: 'Wikimedia',
        label: 'Wikimedia Commons',
        configured: true,
        requiresKey: false,
        status: 'Live Search Active'
      },
      {
        id: 'Unsplash',
        label: 'Unsplash API',
        configured: unsplashConfigured,
        requiresKey: true,
        status: unsplashConfigured ? 'Live API Key Active' : 'No UNSPLASH_ACCESS_KEY configured (bundled Unsplash URLs available)'
      },
      {
        id: 'Pexels',
        label: 'Pexels API',
        configured: pexelsConfigured,
        requiresKey: true,
        status: pexelsConfigured ? 'Live API Key Active' : 'No PEXELS_API_KEY configured'
      },
      {
        id: 'Pixabay',
        label: 'Pixabay API',
        configured: pixabayConfigured,
        requiresKey: true,
        status: pixabayConfigured ? 'Live API Key Active' : 'No PIXABAY_API_KEY configured'
      }
    ]
  });
});

// GET /api/images/search — live image search (Wikimedia always live; Unsplash/Pexels/Pixabay when server env keys exist)
app.get('/api/images/search', async (req, res) => {
  const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  const source = typeof req.query.source === 'string' ? req.query.source : 'all';

  if (!query) {
    return res.status(400).json({ error: 'Search query "q" is required.' });
  }

  const results: any[] = [];
  const providerNotes: string[] = [];

  const wantUnsplash = source === 'all' || source === 'Unsplash';
  const wantPexels = source === 'all' || source === 'Pexels';
  const wantPixabay = source === 'all' || source === 'Pixabay';
  const wantWikimedia = source === 'all' || source === 'Wikimedia';

  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  if (wantUnsplash) {
    if (isConfiguredEnv(unsplashKey)) {
      try {
        const uRes = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`,
          { headers: { Authorization: `Client-ID ${unsplashKey}` } }
        );
        if (uRes.ok) {
          const uJson: any = await uRes.json();
          for (const item of uJson.results || []) {
            results.push({
              id: `live_unsplash_${item.id}`,
              title: item.alt_description || item.description || query,
              category: 'cybersecurity',
              categoryLabel: 'Live Unsplash Result',
              url: item.urls?.regular || item.urls?.full,
              thumbUrl: item.urls?.small || item.urls?.thumb,
              author: item.user?.name || 'Unsplash Photographer',
              authorUrl: item.user?.links?.html || 'https://unsplash.com',
              source: 'Unsplash',
              license: 'Unsplash Free Commercial License',
              aspect: item.width > item.height ? 'landscape' : item.width < item.height ? 'portrait' : 'square',
              tags: [query.toLowerCase()],
              colorTone: 'blue',
              fallbackLocal: '/assets/images/signal_silicon_forensics_1794419167984.jpg'
            });
          }
        }
      } catch (e: any) {
        providerNotes.push(`Unsplash search error: ${e?.message || 'network failure'}`);
      }
    } else {
      providerNotes.push('Unsplash live search unavailable (UNSPLASH_ACCESS_KEY not set on server).');
    }
  }

  const pexelsKey = process.env.PEXELS_API_KEY;
  if (wantPexels) {
    if (isConfiguredEnv(pexelsKey)) {
      try {
        const pRes = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12`,
          { headers: { Authorization: pexelsKey! } }
        );
        if (pRes.ok) {
          const pJson: any = await pRes.json();
          for (const photo of pJson.photos || []) {
            results.push({
              id: `live_pexels_${photo.id}`,
              title: photo.alt || query,
              category: 'cybersecurity',
              categoryLabel: 'Live Pexels Result',
              url: photo.src?.large2x || photo.src?.large,
              thumbUrl: photo.src?.medium || photo.src?.small,
              author: photo.photographer || 'Pexels Photographer',
              authorUrl: photo.photographer_url || 'https://www.pexels.com',
              source: 'Pexels',
              license: 'Pexels Free License',
              aspect: photo.width > photo.height ? 'landscape' : photo.width < photo.height ? 'portrait' : 'square',
              tags: [query.toLowerCase()],
              colorTone: 'dark',
              fallbackLocal: '/assets/images/signal_brutalist_monolith_1794418292586.jpg'
            });
          }
        }
      } catch (e: any) {
        providerNotes.push(`Pexels search error: ${e?.message || 'network failure'}`);
      }
    } else {
      providerNotes.push('Pexels live search unavailable (PEXELS_API_KEY not set on server).');
    }
  }

  const pixabayKey = process.env.PIXABAY_API_KEY;
  if (wantPixabay) {
    if (isConfiguredEnv(pixabayKey)) {
      try {
        const pxRes = await fetch(
          `https://pixabay.com/api/?key=${encodeURIComponent(pixabayKey!)}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`
        );
        if (pxRes.ok) {
          const pxJson: any = await pxRes.json();
          for (const hit of pxJson.hits || []) {
            results.push({
              id: `live_pixabay_${hit.id}`,
              title: hit.tags || query,
              category: 'cybersecurity',
              categoryLabel: 'Live Pixabay Result',
              url: hit.largeImageURL || hit.webformatURL,
              thumbUrl: hit.previewURL || hit.webformatURL,
              author: hit.user || 'Pixabay Contributor',
              authorUrl: hit.pageURL || 'https://pixabay.com',
              source: 'Pixabay',
              license: 'Pixabay Content License',
              aspect: hit.imageWidth > hit.imageHeight ? 'landscape' : hit.imageWidth < hit.imageHeight ? 'portrait' : 'square',
              tags: String(hit.tags || query).split(',').map((t: string) => t.trim().toLowerCase()),
              colorTone: 'cyan',
              fallbackLocal: '/assets/images/signal_tactile_prism_1794418294380.jpg'
            });
          }
        }
      } catch (e: any) {
        providerNotes.push(`Pixabay search error: ${e?.message || 'network failure'}`);
      }
    } else {
      providerNotes.push('Pixabay live search unavailable (PIXABAY_API_KEY not set on server).');
    }
  }

  if (wantWikimedia) {
    try {
      const wmApi = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=18&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1200&format=json&origin=*`;
      const wmRes = await fetch(wmApi, { headers: { 'User-Agent': WIKIMEDIA_USER_AGENT } });
      if (wmRes.ok) {
        const wmJson: any = await wmRes.json();
        const pages = Object.values(wmJson?.query?.pages || {}) as any[];
        const wikiItems: any[] = [];
        for (const p of pages) {
          const info = p?.imageinfo?.[0];
          if (!info || !['image/jpeg', 'image/png', 'image/webp'].includes(info.mime)) continue;
          const cleanUrl = String(info.thumburl || info.url || '').split('?')[0];
          if (!cleanUrl) continue;
          const thumbUrl = cleanUrl.includes('/1200px-') ? cleanUrl.replace('/1200px-', '/480px-') : cleanUrl;
          const meta = info.extmetadata || {};
          const author = String(meta.Artist?.value || 'Wikimedia Commons Contributor').replace(/<[^>]*>/g, '').trim().slice(0, 60) || 'Wikimedia Commons';
          const license = String(meta.LicenseShortName?.value || 'CC BY-SA 4.0').replace(/<[^>]*>/g, '').trim();
          const title = String(p.title || '').replace(/^File:/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
          wikiItems.push({
            id: `live_wiki_${p.pageid}`,
            title: title || query,
            category: 'cybersecurity',
            categoryLabel: 'Live Wikimedia Commons',
            url: cleanUrl,
            thumbUrl,
            author,
            authorUrl: info.descriptionurl || 'https://commons.wikimedia.org',
            source: 'Wikimedia',
            license,
            mime: info.mime,
            aspect: (info.width || 1) > (info.height || 1) ? 'landscape' : (info.width || 1) < (info.height || 1) ? 'portrait' : 'square',
            tags: [query.toLowerCase()],
            colorTone: 'cyan',
            fallbackLocal: '/assets/images/signal_silicon_forensics_1794419167984.jpg'
          });
        }
        // Prefer real photographs (JPEG/WebP) ahead of transparent PNG schematics
        wikiItems.sort((a, b) => {
          const aPhoto = a.mime === 'image/jpeg' || a.mime === 'image/webp' ? 0 : 1;
          const bPhoto = b.mime === 'image/jpeg' || b.mime === 'image/webp' ? 0 : 1;
          return aPhoto - bPhoto;
        });
        results.push(...wikiItems.slice(0, 12));
      }
    } catch (e: any) {
      providerNotes.push(`Wikimedia search error: ${e?.message || 'network failure'}`);
    }
  }

  return res.json({
    query,
    count: results.length,
    results,
    notes: providerNotes
  });
});

// GET /api/image-proxy?url=... — same-origin proxy for clean CORS canvas/SVG/PNG export
app.get('/api/image-proxy', async (req, res) => {
  const rawUrl = typeof req.query.url === 'string' ? req.query.url : '';
  if (!rawUrl) {
    return res.status(400).send('Missing url query parameter');
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return res.status(400).send('Invalid URL');
  }

  if ((parsed.protocol !== 'https:' && parsed.protocol !== 'http:') || !ALLOWED_IMAGE_PROXY_HOSTS.has(parsed.hostname)) {
    return res.status(403).send('Host not permitted for image proxy');
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      headers: {
        'User-Agent': WIKIMEDIA_USER_AGENT
      }
    });
    if (!upstream.ok) {
      return res.status(upstream.status).send('Upstream image fetch failed');
    }
    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await upstream.arrayBuffer();
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    return res.status(502).send(err?.message || 'Proxy error');
  }
});

// GET /api/font-embed?families=Syne,Orbitron,Noto+Sans+Devanagari
// Fetches Google Fonts CSS2 and inlines WOFF2 binaries as base64 data URIs for crisp html-to-image exports
app.get('/api/font-embed', async (req, res) => {
  const rawFamilies = typeof req.query.families === 'string' ? req.query.families : 'Syne,Plus Jakarta Sans,JetBrains Mono';
  const requested = rawFamilies
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean)
    .slice(0, 6);

  if (requested.length === 0) {
    return res.json({ css: '' });
  }

  try {
    const familyParams = requested
      .map((f) => {
        const encoded = encodeURIComponent(f).replace(/%20/g, '+');
        if (f === 'Bebas Neue') return `family=${encoded}:wght@400`;
        if (f === 'Bricolage Grotesque') return `family=${encoded}:opsz,wght@12..96,400;600;700;800`;
        return `family=${encoded}:wght@400;500;600;700;800`;
      })
      .join('&');

    const cssUrl = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
    const cssResp = await fetch(cssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      }
    });
    if (!cssResp.ok) {
      return res.json({ css: '' });
    }

    let cssText = await cssResp.text();
    const urlMatches = [...new Set([...cssText.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map((m) => m[1]))].slice(0, 24);

    await Promise.all(
      urlMatches.map(async (fontUrl) => {
        try {
          const fRes = await fetch(fontUrl);
          if (!fRes.ok) return;
          const mime = fRes.headers.get('content-type') || 'font/woff2';
          const buf = Buffer.from(await fRes.arrayBuffer());
          const dataUri = `data:${mime};base64,${buf.toString('base64')}`;
          cssText = cssText.split(fontUrl).join(dataUri);
        } catch {
          // Skip unreadable font subset cleanly
        }
      })
    );

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json({ css: cssText });
  } catch (err: any) {
    return res.json({ css: '', error: err?.message });
  }
});

// Setup Vite in development or static serve in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
