import { Component } from "@angular/core";


@Component({
    selector: 'app-instructor-detail',
    standalone:true,
    imports:[],
    template: `
    <div class="bg-[#f0f0ff] p-8 md:p-12 lg:p-16 relative overflow-visible">
  <div class="w-[80%] mx-auto relative z-10">
    <!-- Nội dung chính -->
    <div class="max-w-4xl">
      <p class="text-xl font-extrabold text-gray-900 mb-1">INSTRUCTOR</p>
      <h1 class="text-3xl md:text-4xl font-extrabold leading-tight mb-1">
        Dr. Angela Yu, Developer and Lead Instructor
      </h1>
      <h2 class="font-extrabold text-gray-900 text-xl mb-4">
        Developer and Lead Instructor
      </h2>
      <button class="bg-[#a9a6ff] text-[#3f3cd8] font-extrabold text-xs rounded-md px-3 py-1" type="button">
        Eduflow Instructor Partner
      </button>
    </div>
  </div>

  <!-- Ảnh + mạng xã hội nằm lệch phải và xuống dưới -->
  <div class="absolute top-[30%] right-[20%] z-20 
              bg-white rounded-xl p-8 flex flex-col items-center shadow-md max-w-xs w-full">
    <img alt="Portrait photo of Dr. Angela Yu" class="w-40 h-40 rounded-full object-cover mb-8"
         src="https://storage.googleapis.com/a1aa/image/fbec192d-f0da-4344-cbcd-1f3bb084dca6.jpg"
         width="160" height="160"/>
    <button class="bg-[#6b21a8] px-10 py-3 text-white w-full mb-4 rounded-md hover:bg-[#6b21a8c5]">Send message</button>
    <div class="flex gap-6">
      <button aria-label="Personal website" class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition">
        <i class="fas fa-link"></i>
      </button>
      <button aria-label="LinkedIn" class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition">
        <i class="fab fa-linkedin-in"></i>
      </button>
      <button aria-label="X (Twitter)" class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition">
        <i class="fab fa-x-twitter"></i>
      </button>
      <button aria-label="YouTube" class="border border-[#6b21a8] text-[#6b21a8] rounded-md w-12 h-12 flex items-center justify-center text-lg hover:bg-[#6b21a8] hover:text-white transition">
        <i class="fab fa-youtube"></i>
      </button>
    </div>
  </div>
</div>





  <div class="w-[80%] mx-auto px-8 md:px-12 lg:px-16 py-10">
   <div class="flex flex-col md:flex-row md:gap-20">
    <div class="flex gap-16 mb-5 md:mb-8">
     <div>
      <p class="font-extrabold text-lg md:text-xl text-gray-900 mb-1">
       3,127,567
      </p>
      <p class="text-sm text-gray-700">
       Total learners
      </p>
     </div>
     <div>
      <p class="font-extrabold text-lg md:text-xl text-gray-900 mb-1">
       952,779
      </p>
      <p class="text-sm text-gray-700">
       Reviews
      </p>
     </div>
    </div>
   </div>
   <h3 class="font-extrabold text-xl md:text-2xl mb-4">
    About me
   </h3>
   <p class="mb-3 max-w-3xl text-gray-900 text-base md:text-lg leading-relaxed">
    I'm Angela, I'm a developer with a passion for teaching. I'm the
    <strong>
     lead instructor
    </strong>
    at the London App Brewery, London's
      leading
    <strong>
     Programming Bootcamp
    </strong>
    . I've helped hundreds of
      thousands of students learn to code and change their lives by becoming a
      developer. I've been invited by companies such as Twitter, Facebook and
      Google to teach their employees.
   </p>
   <p class="mb-3 max-w-3xl text-gray-900 text-base md:text-lg leading-relaxed">
    My first foray into programming was when I was just 12 years old, wanting
      to build my own Space Invader game. Since then, I've made
    <strong>
     hundred of websites, apps and games
    </strong>
    . But most
      importantly, I realised that my
    <strong>
     greatest passion
    </strong>
    is
      teaching.
   </p>
   <p class="max-w-3xl text-gray-900 text-base md:text-lg leading-relaxed">
    I spend most of my time researching how to make
    <strong>
     learning to code fun
    </strong>
    and make
    <strong>
     hard concepts easy to understand
    </strong>
    . I apply everything I discover into my bootcamp
   </p>
  </div>
    `,
    styles:``,
    providers:[]
})
export class InstructorDetailComponent{
    
}