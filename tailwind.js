import { create } from 'tailwind-rn';
import styles from "./styles.json";
import extrastyles from "./extra-styles.json";

const { tailwind: tw, getColor } = create({ ...styles, ...extrastyles });

export { tw, getColor };


