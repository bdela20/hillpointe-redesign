// src/Pages/TeamPage.tsx
import React, { useState } from 'react';
import styles from './TeamPage.module.scss';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  linkedIn?: string;
  imageUrl?: string;
  featured?: boolean;
  department?: string;
}

const TeamPage: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [showAllMembers, setShowAllMembers] = useState(false);

  // Department filter options
  const departments = [
    'ALL',
    'DEVELOPMENT + INVESTMENT',
    'CONSTRUCTION',
    'PROPERTY MANAGEMENT',
    'ADMINISTRATION + ACCOUNTING'
  ];

  const teamMembers: TeamMember[] = [
    // Featured Leaders
    {
      id: 1,
      name: 'Kelly Mahoney',
      title: 'Co-Founder + Managing Partner',
      bio: 'Kelly Mahoney leads Hillpointe with over 30 years of experience in real estate development and investment. Under his leadership, Hillpointe has become the #4 national developer in workforce housing, closing $750M in Fund V.',
      linkedIn: 'https://www.linkedin.com/in/kelly-mahoney-9966b170/',
      imageUrl: '/Images/Kelly-Mahoney.jpg',
      featured: true
    },
    {
      id: 2,
      name: 'Steven Campisi',
      title: 'Co-Founder + Managing Partner',
      bio: 'Steven Campisi brings extensive expertise in affordable housing development and operations. He oversees Hillpointe\'s portfolio of 30+ communities and drives the company\'s mission to provide quality workforce housing.',
      linkedIn: 'https://www.linkedin.com/in/steven-campisi-cfa-b5569818/',
      imageUrl: '/Images/steven-campisi-scaled.jpg',
      featured: true
    },
    // Other Officers - Update with actual information
    {
      id: 3,
      name: 'JEFF GOLL',
      title: 'Managing Director + Head of Capital Markets',
      bio: 'Jeff is a Managing Director of Hillpointe overseeing the firms capital raising and investor relations initiatives. ',
      linkedIn: 'https://www.linkedin.com/in/jeff-goll-cfa-85573448/',
      imageUrl: '/Images/Jeff_Goll-500x500.jpg',
      department: 'DEVELOPMENT + INVESTMENT'
    },
    {
      id: 4,
      name: 'GABE SHIBLY',
      title: 'Chief Financial Officer',
      bio: 'Gabe serves as Chief Financial Officer for Hillpointe, overseeing the firms accounting and administrative functions.',
      linkedIn: 'https://www.linkedin.com/in/gabriel-maroun-shibly-cpa-28918016/',
      imageUrl: '/Images/Shibly_Gabe-500x500.jpg',
      department: 'ADMINISTRATION + ACCOUNTING'
    },
    {
      id: 5,
      name: 'MIKE BOONE',
      title: 'Managing Director of Multifamily Operations',
      bio: 'Mike Boone, CPM, is a seasoned property management executive with over 20 years of experience driving operational excellence and strategic growth in the multifamily real estate sector.',
      linkedIn: 'https://www.linkedin.com/in/dmikeboonecpm/',
      imageUrl: '/Images/Mike-Boone-headshot-500x500.jpg',
      department: 'PROPERTY MANAGEMENT'
    },
    {
      id: 6,
      name: 'RACHELLE DOW',
      title: 'Vice President of Property Management',
      bio: 'Rachelle serves as the Vice President of Property Management for Hillpointe where her primary role is to help spearhead the strategic management of the firm property management operations',
      linkedIn: 'https://www.linkedin.com/in/rachelledow/',
      imageUrl: '/Images/Rachelle-Dow_Hillpointe-500x500.jpg',
      department: 'PROPERTY MANAGEMENT'
    },
    {
      id: 7,
      name: 'MICHELE McWILLIAMS-TATE',
      title: 'Vice President of Start Up Leasing',
      bio: 'Michele Tate leads Hillpointe Lease Startup programs, bringing deep expertise in multifamily leasing strategy and performance.',
      linkedIn: 'https://www.linkedin.com/in/michele-mcwilliams-tate-b7b8047/',
      imageUrl: '/Images/Michele_McWilliams-Tate-500x500.jpg',
      department: 'PROPERTY MANAGEMENT'
    },
    {
      id: 8,
      name: 'JESSICA RAY',
      title: 'Vice President of Marketing',
      bio: 'Jessica leads marketing at Hillpointe, bringing over 20 years of experience in full-funnel marketing, digital strategy, and cross-functional team leadership. ',
      linkedIn: 'https://www.linkedin.com/in/jessicaray/',
      imageUrl: '/Images/Jessica_Ray_V2-500x500.jpg',
      department: 'ADMINISTRATION + ACCOUNTING'
    },
    {
      id: 9,
      name: 'WILL BOHN',
      title: 'Managing Director of Asset Management',
      bio: 'Will brings over nine years of experience in asset management across both public and private real estate sectors.',
      linkedIn: 'https://www.linkedin.com/in/wbohn/',
      imageUrl: '/Images/William_Bohn_edit-500x500.jpg',
      department: 'DEVELOPMENT + INVESTMENT'
    },
    {
      id: 10,
      name: 'CHIP WOOTEN',
      title: 'Senior Vice President, Debt Capital Markets & Asset Sales',
      bio: 'Manages portfolio performance and implements value-add strategies across all properties.',
      linkedIn: 'https://www.linkedin.com/in/chip-wooten-3898004/',
      imageUrl: '/Images/Chip_Wooten-500x500.jpg',
      department: 'DEVELOPMENT + INVESTMENT'
    },
    {
      id: 11,
      name: 'MARCUS WIEDOWER',
      title: 'Vice President of External Affairs',
      bio: 'Marcus serves as the Vice President of External Affairs for Hillpointe. ',
      linkedIn: 'https://www.linkedin.com/in/marcuswiedower/',
      imageUrl: '/Images/Marcus-Wiedower2-500x500.jpg',
      department: 'ADMINISTRATION + ACCOUNTING'
    },
    {
      id: 12,
      name: 'DUSTIN BROCK',
      title: 'Vice President of Stabilizations',
      bio: 'Dustin is the vice president of facilities and field stabilizations at Hillpointe and formerly served as the director of asset management at Hillpointe. ',
      linkedIn: 'https://www.linkedin.com/in/dustin-brock-589b135/',
      imageUrl: '/Images/Dustin-Brock3-500x500.jpg',
      department: 'CONSTRUCTION'
    },
    {
      id: 13,
      name: 'JUSTIN SPANGLER',
      title: 'Vice President of Construction',
      bio: 'Justin is a senior project manager at Hillpointe, leading the firm’s MEP divisions and a highly skilled team in various specialty projects.',
      linkedIn: 'https://www.linkedin.com/',
      imageUrl: '/Images/Justin-Spangler2-500x500.jpg',
      department: 'CONSTRUCTION'
    },
    {
      id: 14,
      name: 'MARCO MUNOZ',
      title: 'Vice President of Construction',
      bio: 'Marco is one of Hillpointe’s senior project managers. He heads the firm’s crew divisions and coordinates the scheduling of manpower and suppliers for all construction operations. ',
      linkedIn: 'https://www.linkedin.com/',
      imageUrl: '/Images/Marco-Munoz3-500x500.jpg',
      department: 'CONSTRUCTION'
    },
  ];

  const featuredMembers = teamMembers.filter(member => member.featured);
  const otherMembers = teamMembers.filter(member => !member.featured);
  
  // Filter by department
  const filteredMembers = selectedDepartment === 'ALL' 
    ? otherMembers 
    : otherMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className={styles.teamPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gridPattern} />
          <div className={styles.glowOrb} />
          <div className={styles.glowOrb2} />
        </div>
        
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              <span>Meet Our <span></span> </span>
              <span className={styles.gradient}> Visionaries</span>
            </h1>
            <p className={styles.subtitle}>
              Leadership that transforms workforce housing through innovation, 
              integrity, and institutional excellence. 
            </p>
          </div>
        </div>
      </section>


      {/* Featured Leaders */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Executive Leadership</h2>
          <div className={styles.featuredGrid}>
            {featuredMembers.map((member) => (
              <div 
                key={member.id} 
                className={styles.featuredCard}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className={styles.imageWrapper}>
                  <div 
                    className={styles.memberImage}
                    style={{ backgroundImage: `url(${member.imageUrl})` }}
                  >
                    <div className={styles.imageOverlay} />
                  </div>
                  <div className={styles.imageBorder} />
                </div>
                
                <div className={styles.memberContent}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberTitle}>{member.title}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  
                  <a 
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedInButton}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
                
                <div className={`${styles.cardGlow} ${hoveredMember === member.id ? styles.active : ''}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Team Members */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Leadership Team</h2>
          
          {/* Department Filter Buttons */}
          <div className={styles.departmentFilters}>
            {departments.map((dept) => (
              <button
                key={dept}
                className={`${styles.filterButton} ${selectedDepartment === dept ? styles.active : ''}`}
                onClick={() => {
                  setSelectedDepartment(dept);
                  setShowAllMembers(false); // Reset show all when changing departments
                }}
              >
                {dept}
              </button>
            ))}
          </div>
          
          <div className={styles.teamGrid}>
            {filteredMembers.length > 0 ? (
              filteredMembers.slice(0, showAllMembers ? filteredMembers.length : 6).map((member) => (
                <div 
                  key={member.id} 
                  className={styles.teamCard}
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.memberImageSmall}>
                      <img src={member.imageUrl} alt={member.name} />
                      <div className={styles.imageOverlaySmall} />
                    </div>
                    
                    <div className={styles.memberInfo}>
                      <h4 className={styles.memberNameSmall}>{member.name}</h4>
                      <p className={styles.memberTitleSmall}>{member.title}</p>
                      <p className={styles.memberBioSmall}>{member.bio}</p>
                      
                      <a 
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkedInLink}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className={`${styles.cardBorder} ${hoveredMember === member.id ? styles.active : ''}`} />
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No team members found in this department.</p>
              </div>
            )}
          </div>
          
          {/* See More Button */}
          {filteredMembers.length > 6 && (
            <div className={styles.seeMoreContainer}>
              <button
                className={styles.seeMoreButton}
                onClick={() => setShowAllMembers(!showAllMembers)}
              >
                {showAllMembers ? (
                  <>
                    Show Less
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 12L10 7L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                ) : (
                  <>
                    See More Team Members
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className={styles.cultureSection}>
        <div className={styles.container}>
          <div className={styles.cultureContent}>
            <h2 className={styles.cultureTitle}>Building More Than Communities</h2>
            <p className={styles.cultureText}>
              At Hillpointe, our team shares a common vision: creating exceptional 
              workforce housing that strengthens communities and transforms lives. 
              With decades of combined experience and a commitment to excellence, 
              we're not just developers – we're community builders.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>600+</span>
                <span className={styles.statLabel}>Team Members</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2018</span>
                <span className={styles.statLabel}>Founded</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10,000+</span>
                <span className={styles.statLabel}>Workers Housed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;