import allEmpty from "./all-empty";
import basicForm from "./basic-form";
import emailEmpty from "./email-empty";
import firstNameEmpty from "./first-name-empty";
import lastNameEmpty from "./last-name-empty";
import noneAreEmpty from "./none-are-empty";


const settings = [
    ...allEmpty(),
    ...basicForm(),
    ...emailEmpty(),
    ...firstNameEmpty(),
    ...lastNameEmpty(),
    ...noneAreEmpty()
    
];

export default settings;