// ----------------- Multi-language -----------------
const translations = {
    en: {title: "EPFO Ease of Doing", desc: "Simplifying EPFO services for every employee"},
    te: {title: "EPFO సులభ సేవలు", desc: "ప్రతి ఉద్యోగికి EPFO ప్రక్రియలను సులభం చేయడం"},
    hi: {title: "EPFO आसान सेवाएं", desc: "हर कर्मचारी के लिए EPFO प्रक्रियाओं को सरल बनाना"}
};

function changeLanguage(lang){
    document.querySelector("h1").innerText = translations[lang].title;
    document.querySelector("p.lang-desc").innerText = translations[lang].desc;
}

// ----------------- EPFO Tools -----------------
function checkEPFO() {
    let reason = document.getElementById("reason")?.value;
    let years = document.getElementById("years")?.value;
    let result = "";

    if(reason && years){
        years = parseInt(years);
        if(reason==="job" && years>=5) result="You are eligible for PF transfer using Form 13.";
        else if(reason==="unemployed" && years<5) result="You may withdraw PF using Form 19, but pension may not be withdrawable.";
        else if(reason==="medical") result="You may apply for partial withdrawal using Form 31.";
        else result="Please complete all fields to check eligibility.";
    }
    document.getElementById("result")?.innerText = result;
}

function explainStatus() {
    let status = document.getElementById("claimStatus")?.value;
    let msg="";
    if(status==="underprocess") msg="Your claim is being reviewed by EPFO. Normal processing time is 7–20 working days.";
    else if(status==="settled") msg="Your claim is approved. Amount will be credited to your bank account shortly.";
    else if(status==="rejected") msg="Your claim was rejected. Common reasons include name mismatch, bank issues, or KYC not approved.";
    else if(status==="employer") msg="Your claim is pending employer approval. Please contact your employer or HR department.";
    else msg="Please select a claim status.";
    document.getElementById("statusResult")?.innerText=msg;
}

function checkMismatch() {
    let a=document.getElementById("aadhaarName")?.value.toLowerCase().trim();
    let b=document.getElementById("bankName")?.value.toLowerCase().trim();
    let e=document.getElementById("epfoName")?.value.toLowerCase().trim();
    if(a && b && e){
        if(a===b && b===e) document.getElementById("docResult").innerText="No mismatch detected. Your documents look consistent.";
        else document.getElementById("docResult").innerText="Mismatch detected. Please ensure the name matches exactly across Aadhaar, Bank, and EPFO records.";
    } else document.getElementById("docResult").innerText="Please fill all name fields to check mismatch.";
}

function generateGrievance(){
    let issue=document.getElementById("issue")?.value;
    let office=document.getElementById("office")?.value||"concerned EPFO office";
    let text="";
    if(issue==="delay") text=`Respected Sir/Madam,\n\nMy EPFO claim has been under process for an unusually long time. I kindly request ${office} to look into the delay and process my claim at the earliest.\n\nThank you.\n\n- Hema Kiran Thotakura`;
    else if(issue==="rejection") text=`Respected Sir/Madam,\n\nMy EPFO claim was rejected without clear explanation. I request ${office} to kindly clarify the reason and guide me for resubmission.\n\nThank you.\n\n- Hema Kiran Thotakura`;
    else if(issue==="kyc") text=`Respected Sir/Madam,\n\nMy KYC details have been submitted but are not yet approved. I request ${office} to kindly assist in resolving this issue.\n\nThank you.\n\n- Hema Kiran Thotakura`;
    else text="Please select an issue type.";
    document.getElementById("grievanceText")?.value=text;
}

function downloadChecklist(){
    const content=`EPFO PF WITHDRAWAL CHECKLIST\n
✔ UAN Activated
✔ Aadhaar Linked
✔ KYC Approved
✔ Correct Bank IFSC
✔ Name Matches in All Documents

Hema Kiran Thotakura – EPFO Guidance`;
    const blob=new Blob([content], {type:"text/plain"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download="EPFO_PF_Checklist.txt"; a.click();
    URL.revokeObjectURL(url);
}

function trackCase(){
    let id=document.getElementById("caseId")?.value;
    if(!id) document.getElementById("caseResult")?.innerText="Please enter a case reference number.";
    else document.getElementById("caseResult")?.innerText="Status: Under Review. Please allow 7–20 working days.";
}
