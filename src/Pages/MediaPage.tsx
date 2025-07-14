import React, { useState, useEffect, useRef } from 'react';
import styles from './MediaPage.module.scss';

interface MediaArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'press-release' | 'award' | 'announcement' | 'leadership';
  featured: boolean;
  readTime: string;
  link: string;
  image?: string; // Added optional image field
}

const MediaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleArticles, setVisibleArticles] = useState<MediaArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const mediaArticles: MediaArticle[] = [
    {
      id: '1',
      title: 'Hillpointe Donates Executive Inn to Genesis Joy House for Homeless Female Veterans',
      excerpt: 'Hillpointe and Housing and Workforce Collective Solutions (HAWCS), its non-profit organization dedicated to tackling affordable housing challenges, makes significant donation to support veteran housing.',
      date: '2025-07-10',
      category: 'announcement',
      featured: true,
      readTime: '3 min read',
      link: 'https://www.hillpointe.com/hillpointe-donates-the-executive-inn-located-in-perry-georgia-to-genesis-joy-house-to-support-housing-for-homeless-female-veterans/',
      image: 'public/Images/Donates.jpg' // Add your image path here
    },
    {
      id: '2',
      title: 'Hillpointe Earns 2025 Great Place To Work Certification™',
      excerpt: 'Hillpointe is proud to be Certified™ by Great Place To Work® for the first year it participated in the employee survey. The prestigious award recognizes outstanding workplace culture.',
      date: '2025-06-15',
      category: 'award',
      featured: true,
      readTime: '2 min read',
      link: 'https://www.hillpointe.com/hillpointe-earns-2025-great-place-to-work-certification/',
      image: 'public/Images/Earns.jpg' // Add your image path here
    },
    {
      id: '3',
      title: 'Hillpointe Launches Housing and Workforce Collective Solutions (HAWCS)',
      excerpt: 'WINTER PARK, FL – As the top developer and builder of attainable workforce housing multifamily communities in the country, Hillpointe addresses workforce housing challenges through innovative solutions.',
      date: '2025-04-22',
      category: 'announcement',
      featured: true,
      readTime: '4 min read',
      link: 'https://www.hillpointe.com/hillpointe-launches-housing-and-workforce-collective-solutions-hawcs-to-address-attainable-workforce-housing-challenges/',
      image: 'public/Images/Housing.jpg' // Add your image path here
    },
    {
      id: '4',
      title: 'Hillpointe Ranked #4 & #6 in the 2025 NMHC Rankings',
      excerpt: 'Hillpointe is being recognized as one of the top multifamily developers in the nation by The National Multifamily Housing Council (NMHC), showcasing exceptional growth and industry leadership.',
      date: '2025-03-20',
      category: 'award',
      featured: true,
      readTime: '3 min read',
      link: 'https://www.hillpointe.com/hillpointe-ranked-4-6-in-the-2025-nmhc-rankings/',
      image: 'public/Images/Ranked.jpg' // Add your image path here
    },
    {
      id: '5',
      title: 'Hillpointe Raises $750 Million for Hillpointe Workforce Housing Partnership V, LP',
      excerpt: 'WINTER PARK, Fla. – Hillpointe, LLC, a fully integrated real estate development and investment management firm focused on workforce housing, successfully closes historic funding round.',
      date: '2025-03-05',
      category: 'press-release',
      featured: true,
      readTime: '5 min read',
      link: 'https://www.hillpointe.com/hillpointe-llc-raises-750-million/',
      image: 'public/Images/750.jpg' // Add your image path here
    },
    {
      id: '6',
      title: 'Hillpointe Appoints Jamie Telchin Vice President of Development',
      excerpt: 'For the last seven years, Hillpointe has been recognized as one of the fastest-growing attainable housing multifamily development companies, continuing leadership expansion.',
      date: '2025-02-15',
      category: 'leadership',
      featured: false,
      readTime: '2 min read',
      link: 'https://www.hillpointe.com/hillpointe-appoints-jamie-telchin-vice-president-of-development/',
      image: 'public/Images/Jamie.jpg' // Add your image path here
    }
  ];

  const categories = [
    { id: 'all', label: 'All News', count: mediaArticles.length },
    { id: 'press-release', label: 'Press Releases', count: mediaArticles.filter(a => a.category === 'press-release').length },
    { id: 'award', label: 'Awards', count: mediaArticles.filter(a => a.category === 'award').length },
    { id: 'announcement', label: 'Announcements', count: mediaArticles.filter(a => a.category === 'announcement').length },
    { id: 'leadership', label: 'Leadership', count: mediaArticles.filter(a => a.category === 'leadership').length }
  ];

  useEffect(() => {
    // Simulate loading delay for smooth animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = mediaArticles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setVisibleArticles(filtered);
  }, [selectedCategory, searchTerm]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'press-release':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
            <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="currentColor"/>
          </svg>
        );
      case 'award':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
        );
      case 'announcement':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
          </svg>
        );
      case 'leadership':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mediaPage}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBackground}>
          <div className={styles.gridPattern}></div>
          <div className={styles.glowEffect}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.highlight}>Media</span> Center
            </h1>
            <p className={styles.heroSubtitle}>
              Stay informed with the latest news, announcements, and achievements from Hillpointe's journey in transforming workforce housing across America.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>$750M</span>
                <span className={styles.statLabel}>Fund V Raised</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>#4</span>
                <span className={styles.statLabel}>NMHC Ranking</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>Communities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.container}>
          {/* Search and Filter Bar */}
          <div className={styles.filterBar}>
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search news and announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            
            <div className={styles.categoryFilter}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                >
                  {category.label}
                  <span className={styles.count}>({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className={styles.articlesGrid}>
            {visibleArticles.length === 0 ? (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or filter selection</p>
              </div>
            ) : (
              visibleArticles.map((article, index) => (
                <article 
                  key={article.id} 
                  className={`${styles.articleCard} ${article.featured ? styles.featured : ''} ${article.image ? styles.withImage : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Article Image */}
                  {article.image && (
                    <div className={styles.articleImage}>
                      <img 
                        src={article.image} 
                        alt={article.title}
                        onError={(e) => {
                          // Hide image container if image fails to load
                          const target = e.target as HTMLImageElement;
                          const container = target.parentElement;
                          if (container) {
                            container.style.display = 'none';
                          }
                        }}
                      />
                      <div className={styles.imageOverlay}></div>
                    </div>
                  )}
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.categoryBadge}>
                        {getCategoryIcon(article.category)}
                        <span>{article.category.replace('-', ' ')}</span>
                      </div>
                      <span className={styles.readTime}>{article.readTime}</span>
                    </div>
                    
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleExcerpt}>{article.excerpt}</p>
                    
                    <div className={styles.cardFooter}>
                      <time className={styles.articleDate}>{formatDate(article.date)}</time>
                      <a 
                        href={article.link} 
                        className={styles.readMore}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className={styles.cardGlow}></div>
                </article>
              ))
            )}
          </div>

          {/* Media Resources Section */}
          <div className={styles.mediaResources}>
            <div className={styles.resourcesHeader}>
              <h2>Media Resources</h2>
              <p>Access our press kit, brand assets, and media contact information</p>
            </div>
            
            <div className={styles.resourcesGrid}>
              <div className={styles.resourceCard}>
                <div className={styles.resourceIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
                    <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Press Kit</h3>
                <p>Download our complete press kit with company information and executive bios</p>
                <button className={styles.resourceButton}>Download</button>
              </div>
              
              <div className={styles.resourceCard}>
                <div className={styles.resourceIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9L11 5H19C20.1 5 21 5.9 21 7V15Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3>Brand Assets</h3>
                <p>High-resolution logos, brand guidelines, and marketing materials</p>
                <button className={styles.resourceButton}>Access</button>
              </div>
              
              <div className={styles.resourceCard}>
                <div className={styles.resourceIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12Z" fill="currentColor"/>
                    <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Media Contact</h3>
                <p>Get in touch with our media relations team for interviews and inquiries</p>
                <button className={styles.resourceButton}>Contact</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaPage;