import { Component } from "@angular/core";



@Component({
    selector: 'app-profile-photo',
    standalone:true,
    template: `
    <div class="max-w-xl mx-auto p-8 rounded-2xl">
  <h2 class="text-xl font-semibold text-gray-800 mb-2 text-center">Image Preview</h2>
  <p class="text-gray-500 text-base mb-5 text-center">
    Minimum 200x200 pixels, Maximum 6000x6000 pixels
  </p>

  <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex justify-center items-center h-64 overflow-hidden mb-6">
    <img
      src="https://storage.googleapis.com/a1aa/image/6094e6aa-99a5-47c4-1827-55d3efda96dc.jpg"
      alt="User profile icon inside circle on light gray background"
      class="object-contain h-full w-full"
    />
  </div>

  <form class="flex flex-col gap-4 items-center">
    <input
      type="file"
      class="w-full border border-gray-300 rounded-md px-4 py-3 text-base text-gray-700 file:mr-4 file:py-3 file:px-5 file:rounded-md file:border-0 file:text-base file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
    />

    <button
      type="submit"
      disabled
      class="bg-purple-700 text-white font-semibold rounded-md px-6 py-3 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors w-full sm:w-1/2 text-center"
    >
      Save
    </button>
  </form>
</div>



    `,
    styles: ``
})
export class ProfilePhotoComponent{

}