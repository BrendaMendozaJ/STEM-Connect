// OpenAlex API - Datos académicos reales
const BASE_URL = 'https://api.openalex.org';

export const fetchLatinScientists = async () => {
  try {
    const countries = 'MX|BR|AR|CL|CO|PE|EC';
    const response = await fetch(
      `${BASE_URL}/authors?filter=last_known_institutions.country_code:${countries}&per-page=30&sort=cited_by_count:desc`
    );
    const data = await response.json();
    
    return data.results.map(author => ({
      id: author.id,
      name: author.display_name,
      country: getCountryName(author.last_known_institutions?.[0]?.country_code),
      area: author.topics?.[0]?.display_name || 'Investigación',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(author.display_name)}&background=8b5cf6&color=fff&size=200`,
      bio: `Investigador con ${author.works_count} publicaciones y ${author.cited_by_count} citas totales.`,
      achievements: [
        `${author.works_count} publicaciones científicas`,
        `${author.cited_by_count} citas totales`,
        `H-index: ${author.h_index}`,
        `${author.last_known_institutions?.[0]?.display_name || 'Institución no disponible'}`
      ],
      quote: '"La investigación científica transforma el mundo."',
      realLink: `https://openalex.org/${author.id}`,
      hIndex: author.h_index
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const fetchPapers = async () => {
  try {
    const countries = 'MX|BR|AR|CL|CO|PE|EC';
    const response = await fetch(
      `${BASE_URL}/works?filter=authorships.institutions.country_code:${countries}&per-page=20&sort=cited_by_count:desc`
    );
    const data = await response.json();
    
    return data.results.map(work => ({
      id: work.id,
      title: work.title,
      authors: work.authorships.slice(0, 2).map(a => a.author.display_name).join(', '),
      country: getCountryName(work.authorships[0]?.institutions[0]?.country_code),
      year: new Date(work.publication_date).getFullYear(),
      area: work.topics?.[0]?.display_name || 'General',
      citations: work.cited_by_count,
      source: work.primary_location?.source?.display_name || 'Journal',
      link: work.doi ? `https://doi.org/${work.doi}` : `https://openalex.org/${work.id}`
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const getCountryName = (code) => {
  const map = {
    'MX': 'México', 'BR': 'Brasil', 'AR': 'Argentina',
    'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Perú', 'EC': 'Ecuador'
  };
  return map[code] || code;
};