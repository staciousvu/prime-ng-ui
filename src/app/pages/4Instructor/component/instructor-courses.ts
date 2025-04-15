import { Component } from "@angular/core";



@Component({
    selector: 'app-instructor-courses',
    standalone:true,
    template: `
    <div class="p-10">
    <div class="w-full">
        <h1 class="text-4xl font-bold mb-6">Courses</h1>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
            <div class="flex items-start mb-4">
                <i class="fas fa-info-circle text-purple-600 text-2xl mr-4"></i>
                <div>
                    <h2 class="font-bold text-lg mb-2">We’re updating the free course experience for students and instructors.</h2>
                    <ul class="list-disc list-inside mb-4">
                        <li>New free courses <span class="font-bold">(published after March 17, 2020)</span> must have less than 2 hours of video content.</li>
                        <li>Existing free courses <span class="font-bold">(published before March 17, 2020)</span> that contain more than 2 hours of video content will remain published.</li>
                        <li>All free courses will only consist of video content and resources. Certificate of completion, Q&A, and direct messaging will <span class="font-bold">only</span> be available for paid enrollments.</li>
                    </ul>
                    <p class="mb-4">To learn more about the new free course experience and policy read our <a href="#" class="text-purple-600 underline">FAQ on the teaching center.</a></p>
                    <button class="bg-white border border-purple-600 text-purple-600 font-bold py-2 px-4 rounded hover:bg-purple-50">Dismiss</button>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full mt-5">
   <!-- Header -->
   <div class="flex justify-between items-center mb-4">
    <div class="flex items-center space-x-2">
     <input class="border border-gray-300 rounded px-4 py-3" placeholder="Search your courses" type="text"/>
     <button class="bg-purple-600 text-white px-4 py-3 rounded">
      <i class="fas fa-search">
      </i>
     </button>
    </div>
    <div class="flex items-center space-x-2">
     <button class="bg-purple-600 text-white px-4 py-3 rounded">
      New course
     </button>
    </div>
   </div>
   <!-- Course List -->
   <div class="space-y-4">
    <!-- Course Item -->
    <div class="border border-gray-300 rounded p-4 flex justify-between items-center">
     <div class="flex items-center space-x-4">
      <img alt="Course thumbnail" class="w-24 h-24 object-cover" src="http://localhost:8080/images/course0.png"/>
      <div>
       <h2 class="text-xl font-bold">
        yeah my friend
       </h2>
       <p class="text-gray-500">
        DRAFT Public
       </p>
       <p class="text-gray-500">
        .NET &amp; Microservices DDD, CQRS Vertical/ Clean Architecture
       </p>
       <p class="text-gray-500">
        4.5 ★★★★★ (200 Reviews)
       </p>
       <p class="text-gray-500">
        ₹24,000 (₹30,000)
       </p>
      </div>
     </div>
     <div class="flex items-center space-x-4">
      <p class="font-bold">
       Finish your course
      </p>
      <div class="w-64 bg-gray-200 rounded-full h-2.5">
       <div class="bg-purple-600 h-2.5 rounded-full" style="width: 50%">
       </div>
      </div>
     </div>
    </div>
    <!-- Course Item -->
    <div class="border border-gray-300 rounded p-4 flex justify-between items-center">
     <div class="flex items-center space-x-4">
      <img alt="Course thumbnail" class="w-24 h-24 object-cover" src="http://localhost:8080/images/course1.png"/>
      <div>
       <h2 class="text-xl font-bold">
        okok
       </h2>
       <p class="text-gray-500">
        DRAFT Public
       </p>
      </div>
     </div>
     <div class="flex items-center space-x-4">
      <p class="font-bold">
       Finish your course
      </p>
      <div class="w-64 bg-gray-200 rounded-full h-2.5">
       <div class="bg-purple-600 h-2.5 rounded-full" style="width: 20%">
       </div>
      </div>
     </div>
    </div>

   </div>
  </div>
</div>
    `,
    styles: ``
})
export class InstructorCoursesComponent{

}