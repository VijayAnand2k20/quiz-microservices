import {useState, useEffect} from "react";
import { useTheme } from "next-themes";

import Logo from "../../../public/home_light.svg";
import LogoDark from "../../../public/home_dark.svg";
import Image from "next/image";

function HomeLogo() {
  const useGetTheme = () => {
    const resolvedTheme = useTheme();
    return resolvedTheme;
  };

  const [logo, setLogo] = useState(Logo);
  const { resolvedTheme } = useGetTheme();
  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogo(LogoDark);
    } else {
      setLogo(Logo);
    }
  }, [resolvedTheme]);

  return (
    <Image src={logo} alt="Home Logo" />
  );
}

export default HomeLogo;
