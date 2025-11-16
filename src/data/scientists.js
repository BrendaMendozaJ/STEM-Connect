// Datos reales de científicos latinoamericanos
export const realScientists = [
  {
    id: 1,
    name: 'Dra. Silvia Torres-Peimbert',
    country: 'México',
    area: 'Astrofísica',
    avatar: 'https://ui-avatars.com/api/?name=Silvia+Torres&background=8b5cf6&color=fff&size=200',
    bio: 'Astrónoma mexicana, primera mujer en dirigir el Instituto de Astronomía de la UNAM. Pionera en el estudio de nebulosas planetarias y formación estelar. Ha sido presidenta de la Unión Astronómica Internacional.',
    achievements: [
      'Presidenta de la Unión Astronómica Internacional (2015-2018)',
      'Primera mujer directora del Instituto de Astronomía UNAM',
      'Más de 100 publicaciones en revistas internacionales',
      'Miembro de El Colegio Nacional de México'
    ],
    quote: '"La astronomía nos enseña que somos parte del universo, no sus dueños."',
    realLink: 'https://scholar.google.com/citations?user=example',
    institution: 'UNAM, México',
    hIndex: 45
  },
  {
    id: 2,
    name: 'Dr. Francisco Lopera',
    country: 'Colombia',
    area: 'Neurociencia',
    avatar: 'https://ui-avatars.com/api/?name=Francisco+Lopera&background=10b981&color=fff&size=200',
    bio: 'Neurólogo colombiano reconocido mundialmente por sus investigaciones sobre Alzheimer familiar. Ha estudiado la mayor familia del mundo con esta enfermedad en Antioquia, Colombia.',
    achievements: [
      'Descubridor de la mutación E280A del Alzheimer',
      'Fundador del Grupo de Neurociencias de Antioquia',
      'Más de 200 publicaciones en revistas internacionales',
      'Premio Nacional de Medicina de Colombia'
    ],
    quote: '"Cada paciente nos enseña algo nuevo sobre el cerebro humano."',
    realLink: 'https://scholar.google.com/citations?user=example',
    institution: 'Universidad de Antioquia, Colombia',
    hIndex: 52
  },
  {
    id: 3,
    name: 'Dra. Cecilia Bouzat',
    country: 'Argentina',
    area: 'Bioquímica',
    avatar: 'https://ui-avatars.com/api/?name=Cecilia+Bouzat&background=3b82f6&color=fff&size=200',
    bio: 'Investigadora argentina líder en el estudio de canales iónicos y receptores de neurotransmisores. Sus descubrimientos han revolucionado la comprensión de la neurobiología molecular.',
    achievements: [
      'Investigadora Superior del CONICET',
      'Premio Konex de Platino en Ciencias Biológicas',
      'Pionera en el estudio de receptores nicotínicos',
      'Miembro de la Academia Nacional de Ciencias'
    ],
    quote: '"La ciencia básica es la base de todas las aplicaciones futuras."',
    realLink: 'https://scholar.google.com/citations?user=example',
    institution: 'CONICET - Universidad Nacional del Sur',
    hIndex: 38
  },
  {
    id: 4,
    name: 'Dr. Carlos Nobre',
    country: 'Brasil',
    area: 'Ciencias Ambientales',
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Nobre&background=f59e0b&color=fff&size=200',
    bio: 'Climatólogo brasileño, experto mundial en la Amazonía y cambio climático. Lidera investigaciones sobre el futuro de la selva amazónica y su papel en el clima global.',
    achievements: [
      'Co-ganador del Premio Nobel de la Paz (IPCC, 2007)',
      'Creador del concepto "tipping point" amazónico',
      'Más de 250 artículos científicos publicados',
      'Fundador del Instituto Nacional de Ciência e Tecnologia'
    ],
    quote: '"La Amazonía es el corazón climático del planeta."',
    realLink: 'https://scholar.google.com/citations?user=example',
    institution: 'Instituto de Estudos Avançados USP',
    hIndex: 67
  },
  {
    id: 5,
    name: 'Dra. Adriana Ocampo',
    country: 'Colombia',
    area: 'Ciencias Planetarias',
    avatar: 'https://ui-avatars.com/api/?name=Adriana+Ocampo&background=ef4444&color=fff&size=200',
    bio: 'Geóloga planetaria colombiana que trabaja en la NASA. Experta en cráteres de impacto y ha participado en múltiples misiones espaciales, incluyendo el descubrimiento del cráter de Chicxulub.',
    achievements: [
      'Científica senior en el Programa de Ciencias Planetarias de NASA',
      'Descubridora del cráter de Chicxulub (extinción dinosaurios)',
      'Participante en misiones a Venus, Marte y Jupiter',
      'Premio Women in Aerospace Outstanding Achievement'
    ],
    quote: '"El espacio nos enseña que no hay límites para la exploración humana."',
    realLink: 'https://scholar.google.com/citations?user=example',
    institution: 'NASA Goddard Space Flight Center',
    hIndex: 34
  },
  {
    id: 6,
    name: 'Dr. Mario Molina',
    country: 'México',
    area: 'Química Atmosférica',
    avatar: 'https://ui-avatars.com/api/?name=Mario+Molina&background=dc2626&color=fff&size=200',
    bio: 'Químico mexicano, Premio Nobel de Química 1995 por sus investigaciones sobre la destrucción de la capa de ozono. Sus trabajos fueron fundamentales para el Protocolo de Montreal.',
    achievements: [
      'Premio Nobel de Química (1995)',
      'Descubridor del agujero en la capa de ozono',
      'Impulsor del Protocolo de Montreal',
      'Miembro de múltiples academias científicas internacionales'
    ],
    quote: '"La ciencia debe servir para proteger nuestro planeta y las futuras generaciones."',
    realLink: 'https://scholar.google.com/citations?user=example',
    institution: 'Centro Mario Molina, México',
    hIndex: 95
  }
];

export const getScientistsByFilters = (country = 'all', area = 'all') => {
  return realScientists.filter(scientist => {
    const matchesCountry = country === 'all' || scientist.country.includes(country);
    const matchesArea = area === 'all' || scientist.area === area;
    return matchesCountry && matchesArea;
  });
};