import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-serif font-bold text-2xl mb-4">
              Excellence<span className="text-secondary">Training</span>
            </div>
            <p className="text-neutral-300 mb-6">
              Transforming organizations through expert-led training and development programs designed to elevate performance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Programs</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Leadership Development</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Team Performance</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Professional Skills</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Executive Coaching</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Custom Training Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Blog & Articles</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Free Resources</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">Upcoming Events</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-secondary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-secondary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="text-neutral-300">
                  Kenyatta Avenue, GPO Building, 3rd Floor<br />
                  P.O. Box 34567, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-secondary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="text-neutral-300">+254 722 123 456</span>
              </li>
              <li className="flex items-center">
                <span className="text-secondary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="text-neutral-300">info@excellencetraining.co.ke</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="border-neutral-700" />
        
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {year} ExcellenceTraining. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-secondary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-secondary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-secondary text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
