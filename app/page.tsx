import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      hello
      
      <Link href = "/patients">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Go to Patients</button>
      </Link>
    </div>
  );
}
