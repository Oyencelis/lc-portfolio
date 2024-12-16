// src/pages/ResourcePage.tsx
import React, { useState } from 'react';
import { ResourceCard } from '../components/ResourceCard';
import { SearchBar } from '../components/SearchBar';
import { resources } from '../data/resource';
import WaveBackground from '../components/WaveBackground';
import { motion } from 'framer-motion';

const ResourcePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group resources by category
  const groupedResources = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as { [key: string]: typeof resources });

  return (
    <section className="resources-section">
      <div className="resources-page">
        <header className="resources-header">
          <h1>My Developer Tools</h1>
          <p>Explore the tools that power my development workflow 🛠️</p>
        </header>

        <div className="search-container">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        
        {Object.entries(groupedResources).map(([category, categoryResources]) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="resources-grid">
              {categoryResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <ResourceCard
                    title={resource.title}
                    description={resource.description}
                    link={resource.link}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <div className="no-results">
            <p>No resources found matching your search.</p>
          </div>
        )}
      </div>
      <WaveBackground />
    </section>
  );
};

export default ResourcePage;