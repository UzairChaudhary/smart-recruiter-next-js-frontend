import Link from "next/link";
import { usePathname } from 'next/navigation'

const ActiveLink = ({ href, children }) => {
  const pathname = usePathname();
  
  // Use the pathname of the current route to determine if the link should be active
  const isActive = pathname === href;
  

  return (
    <Link href={href} legacyBehavior>
      <a className={` ${isActive ? "active" : ""}`}>{children}</a>
    </Link>
  );
};

export default ActiveLink;
