# Data Model

## Entities

### Experience
Represents professional roles and milestones. Includes information such as company name, job title, start and end dates, and a list of key achievements or responsibilities.

### Project
Showcases side projects or specific highlighting pieces of work. Includes the project title, a descriptive summary, and links to live demos or external documentation.

### Repository
Represents technical "playground" items, directly tied to source code repositories (like GitHub). Includes the repository name, description, and the URL to the code.

### ContactLink
Represents various ways to reach the developer or find them on social platforms. Includes the platform name (e.g., GitHub, LinkedIn, Twitter), the corresponding URL, and icon identifiers.

### TechStackItem
Represents a specific technology or tool (e.g., React, Node.js, GSAP). These are used to tag other entities to show what was used in a project or role.

## Relationships

- **Experience** has many **TechStackItem**s (technologies used in that role)
- **Project** has many **TechStackItem**s (technologies used to build it)
- **Project** may relate to one **Repository** (the source code for the project)
- **Repository** has many **TechStackItem**s (primary languages or tools used)
