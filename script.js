
const typeWriter = function(element, words, wait = 3000) {
   this.element = element;
   this.words = words;
   this.txt = "";
   this.wordIndex = 0;
   this.wait = parseInt(wait, 10);
   this.type();
   this.isDeleting = false;
};

typeWriter.prototype.type = function() {
  
   const actual = this.wordIndex % this.words.length;
   const fullTxt = this.words[actual];

   
   if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
   } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
   }
   
   this.element.innerHTML = `<span class="cursor-effect">${this.txt}<span>`;
   let typeSpeed = 300;

   if (this.isDeleting) {
      typeSpeed /= 1.4;
   }
  
   if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait; 
      this.isDeleting = true; 
   } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
            typeSpeed = 500;
   }

   setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
   const element = document.querySelector(".txt");
   const words = JSON.parse(
      element.getAttribute("data-words")
   ); 
   const wait = element.getAttribute("data-wait");
   new typeWriter(element, words, wait);
}
