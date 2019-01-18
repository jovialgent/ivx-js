import text from "./text";
import number from "./number";
import email from "./email";
import options from "./options";
import checkbox from "./checkbox";
import radio from "./radio";
import date from "./date";
import dateTimeLocal from "./datetime-local";

const config = [
    text(),
    number(),
    email(),
    options(),
    checkbox(),
    radio(),
    date(),
    dateTimeLocal(),
];

export default config;