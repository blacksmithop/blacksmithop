import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace('/api/', '');

  try {
    switch (path) {
      case 'about':
        return await handleAbout(req);
      case 'tech-stack':
        return await handleTechStack(req);
      case 'contact':
        return await handleContact(req);
      default:
        return new Response(
          JSON.stringify({ error: 'Not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

async function handleAbout(req: Request): Promise<Response> {
  const data = {
    description: "I'm a passionate Associate Developer with a keen interest in building scalable web applications. I love learning new technologies and solving complex problems.",
    highlights: [
      "Full-stack development with modern technologies",
      "Experience with cloud platforms and DevOps practices",
      "Strong problem-solving and analytical skills",
      "Committed to writing clean, maintainable code"
    ]
  };

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTechStack(req: Request): Promise<Response> {
  const data = [
    { name: 'TypeScript', icon: '🔷', section: 'Languages' },
    { name: 'Python', icon: '🐍', section: 'Languages' },
    { name: 'React', icon: '⚛️', section: 'Frameworks' },
    { name: 'Docker', icon: '🐳', section: 'DevOps' }
  ];

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleContact(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const data = await req.json();
  
  // Here you would typically send an email or store the contact form data
  // For now, we'll just return a success response
  return new Response(
    JSON.stringify({ success: true, message: 'Message sent successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

serve(handler);