import { Component } from "@angular/core";



@Component({
    selector: 'app-edit-course-curriculum',
    standalone:true,
    template: `
    <section class="bg-white rounded-md shadow-sm flex-grow w-full min-w-0 border border-[#E2E8F0] pb-14" aria-label="Intended learners">
    <header class="border-b border-[#E2E8F0] px-10 py-7">
      <h1 class="text-2xl font-semibold text-[#1E293B]">Curriculum</h1>
    </header>
    <div class="px-10 pt-10 space-y-8 text-[#334155] text-base font-normal max-w-4xl">
    <p>curriculum</p>
    </div>
  </section>
    `,
    styles: ``
})
export class EditCourseCurriculumComponent{

}