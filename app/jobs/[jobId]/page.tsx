import JobDetailsClient from './JobDetailsClient';

export function generateStaticParams() {
  // Return placeholder param for static export. Client component reads dynamic route params/query at runtime.
  return [{ jobId: 'preview' }];
}

export default function JobDetailsPage() {
  return <JobDetailsClient />;
}
