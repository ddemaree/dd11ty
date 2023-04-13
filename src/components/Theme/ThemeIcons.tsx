import { useTheme } from "./ThemeScript";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faComputerClassic,
  faMoonStars,
  faSun,
} from "@fortawesome/sharp-solid-svg-icons";

export const CheckIcon = () => (
  <FontAwesomeIcon icon={faCheck} fixedWidth className="justify-self-end" />
);

export const LightThemeIcon = () => (
  <FontAwesomeIcon icon={faSun} fixedWidth className="w-6" />
);
export const DarkThemeIcon = () => (
  <FontAwesomeIcon icon={faMoonStars} fixedWidth className="w-6" />
);

export function SystemThemeIcon() {
  const { systemTheme } = useTheme();
  return (
    <div className="fa-layers w-6">
      <FontAwesomeIcon icon={faComputerClassic} opacity={0.4} fixedWidth />
      <FontAwesomeIcon
        icon={systemTheme === "dark" ? faMoonStars : faSun}
        transform="shrink-4 right-5 down-5"
      />
    </div>
  );
}

export function CurrentThemeIcon() {
  const { theme } = useTheme();
  switch (theme) {
    case "system":
      return <SystemThemeIcon />;
    case "light":
      return <LightThemeIcon />;
    case "dark":
      return <DarkThemeIcon />;
    case "arc":
      return null;
    default:
      return null;
  }
}
