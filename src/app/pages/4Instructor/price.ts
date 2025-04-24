import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-edit-course-price',
    standalone: true,
    imports: [RouterModule],
    template: `
        <section class="bg-white rounded-md shadow-sm flex-grow w-full min-w-0 border border-[#E2E8F0] pb-14" aria-label="Intended learners">
            <header class="border-b border-[#E2E8F0] px-10 py-7">
                <h1 class="text-2xl font-semibold text-[#1E293B]">Price</h1>
            </header>
            <div class="px-10 pt-10 space-y-8 text-[#334155] text-base font-normal max-w-4xl">
            <div class="max-w-xl">
    <h2 class="font-semibold text-gray-900 text-base mb-2">Đặt giá cho khóa học của bạn</h2>
    <p class="text-gray-900 text-base mb-6 leading-relaxed">
    Vui lòng chọn loại tiền tệ và mức giá cho khóa học của bạn. Nếu bạn muốn cung cấp khóa học miễn phí, khóa học đó phải có tổng thời lượng video dưới 2 giờ. Ngoài ra, các khóa học có bài kiểm tra thực hành không được miễn phí.
    </p>
    <form class="flex flex-wrap gap-x-6 gap-y-4 items-end">
      <div>
        <label for="priceTier" class="block font-semibold text-gray-900 text-sm mb-1 flex items-center gap-1">
          Price Tier
          <i class="fas fa-info-circle text-gray-500 text-xs" title="Select the price tier for your course"></i>
        </label>
        <select id="priceTier" name="priceTier" class="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-900 text-sm w-36 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600">
          <option>Free</option>
          <option>đ129.000</option>
          <option>đ229.000</option>
          <option>đ349.000</option>
          <option>đ499.000</option>
        </select>
      </div>
      <button type="submit" class="bg-purple-700 text-white font-semibold rounded-md px-5 py-2 text-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600">
        Save
      </button>
    </form>
  </div>
            </div>
        </section>
    `,
    styles: ``
})
export class EditCoursePriceComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {

    }
}
