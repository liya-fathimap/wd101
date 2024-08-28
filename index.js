const retrieve =() => {
    let entries = localStorage.getItem("userentries");
    if (entries){
        entries =JSON.parse(entries);
    } else{
        entries = [];
    }
    return entries;
};
const dob_check =(dob) => {
    let dobDate=new Date(dob);
let currentDate = new Date();

    let yearDiff = currentDate.getFullYear() - dobDate.getFullYear();
let monthDiff = currentDate.getMonth() - dobDate.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
        yearDiff--;
    }
    return yearDiff;
};

const saveForm = (event) => {
    event.preventDefault();
    
    const name =document.getElementById("name").value;
    const email =document.getElementById("email").value;
    const password =document.getElementById("password").value;
    const dobInput =document.getElementById("dob");
    const dob = dobInput.value;
    const termandcondn =document.getElementById("Terms").checked;
     
  
    agevalid(dobInput);
    
   
    if (!document.forms["forms"].reportValidity()) {
        return; 
    }
    
    const data = {
        name,
        email,
        password,
        dob,
        termandcondn
    };

    let userentries= retrieve();
    userentries.push(data);
    localStorage.setItem("userentries", JSON.stringify(userentries));
    display();
    document.forms["forms"].reset();
};



const display =()=> {
    const entries = retrieve();
    const tableentries = entries.map((entry) => {
        const namespace = `<td>${entry.name}</td>`;
        const emailspace = `<td>${entry.email}</td>`;
        const passwordspace = `<td>${entry.password}</td>`;
        const dobspace = `<td>${entry.dob}</td>`;
        const termsspace = `<td>${entry.termandcondn ? 'True' : 'False'}</td>`;

        return `<tr>${namespace}${emailspace}${passwordspace}${dobspace}${termsspace}</tr>`;
    }).join("\n");
    
    const table = `<table><tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th></tr>${tableentries}</table>`;
    
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};


const agevalid=(dobInput) => {
    const dob = dobInput.value;
    const age= dob_check(dob);
    if (age< 18 || age> 55) {
dobInput.setCustomValidity("age must be between  18 and 55"); 
    } else {
 dobInput.setCustomValidity(""); 
    }
    dobInput.reportValidity();
};
document.getElementById("forms").addEventListener("submit", saveForm);
display();

    


