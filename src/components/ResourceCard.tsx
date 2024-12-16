interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link }) => (
  <div className="resource-card" role="article">
    <h3>{title}</h3>
    <p>{description}</p>
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-link"
      aria-label={`Visit ${title} website`}
    >
      Visit Resource
    </a>
  </div>
);
