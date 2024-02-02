import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'

const ActiveLink = ({ href, children }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Use the pathname of the current route to determine if the link should be active
  const isActive = pathname === href;
  
  const handleClick = (e) => {
    //console.log("pathname: ",pathname)
    //console.log("href: ",href)
    if (pathname.includes("/Jobs") && href==="#jobs-section"){
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    else if (pathname.includes("/Jobs") && href!=="/"){
      
      router.push('/');
      
  }
    else if(href!=="/"){
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Link href={href} legacyBehavior scroll= {false}>
      <a className={` ${isActive ? "active" : ""}`} onClick={handleClick}>{children}</a>
    </Link>
  );
};

export default ActiveLink;
