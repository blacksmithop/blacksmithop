/** @type {import('next').NextConfig} **/
const nextConfig = {
  output: 'export', // Enables static export
  basePath: '/blacksmithop', // Matches your GitHub Pages repo path
  trailingSlash: true, // Ensures paths like /projects/ work correctly
};

export default nextConfig;
