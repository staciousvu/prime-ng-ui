import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderControlService } from '../service/header.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-edit-course-landing-page',
    standalone: true,
    imports: [RouterModule],
    template: `
        <section class="bg-white rounded-md shadow-sm flex-grow w-full min-w-0 border border-[#E2E8F0] pb-14" aria-label="Intended learners">
            <header class="border-b border-[#E2E8F0] px-10 py-7">
                <h1 class="text-2xl font-semibold text-[#1E293B]">Course landing page</h1>
            </header>
            <div class="px-10 pt-10 space-y-8 text-[#334155] text-base font-normal max-w-4xl">
                <p>
                    Trang đích khóa học của bạn đóng vai trò quan trọng đối với thành công của bạn trên Udemy. Nếu thực hiện đúng, nó cũng có thể giúp bạn tăng khả năng hiển thị trên các công cụ tìm kiếm như Google. Khi bạn hoàn thành phần này, hãy
                    nghĩ đến việc tạo Trang đích khóa học hấp dẫn để chứng minh lý do tại sao ai đó muốn đăng ký khóa học của bạn. Tìm hiểu thêm về cách tạo <a href="#" class="text-purple-700 underline hover:text-purple-800">landing page</a>.
                </p>
                <form class="space-y-6">
                    <!-- Course title -->
                    <div>
                        <label for="course-title" class="block font-semibold text-gray-900 mb-1"> Course title </label>
                        <div class="flex items-center border border-gray-400 rounded-md overflow-hidden">
                            <input id="course-title" type="text" placeholder="Insert your course title." maxlength="60" class="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none" />
                            <span class="text-gray-600 px-4 select-none">60</span>
                        </div>
                        <p class="mt-1 text-xs text-gray-600">Tiêu đề của bạn phải là sự kết hợp giữa sự thu hút, thông tin rõ ràng và được tối ưu hóa cho tìm kiếm.</p>
                    </div>

                    <!-- Course subtitle -->
                    <div>
                        <label for="course-subtitle" class="block font-semibold text-gray-900 mb-1"> Course subtitle </label>
                        <div class="flex items-center border border-gray-400 rounded-md overflow-hidden">
                            <input id="course-subtitle" type="text" placeholder="Insert your course subtitle." maxlength="120" class="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none" />
                            <span class="text-gray-600 px-4 select-none">120</span>
                        </div>
                        <p class="mt-1 text-xs text-gray-600">Sử dụng 1 hoặc 2 từ khóa liên quan và đề cập đến 3-4 lĩnh vực quan trọng nhất mà bạn đã học trong suốt khóa học.</p>
                    </div>

                    <!-- Course description -->
                    <div>
                        <label for="course-description" class="block font-semibold text-gray-900 mb-1"> Course description </label>
                        <div class="border border-gray-400 rounded-t-md flex space-x-3 px-3 py-2 text-gray-700 bg-white">
                            <button type="button" aria-label="Bold" class="font-bold focus:outline-none">B</button>
                            <button type="button" aria-label="Italic" class="italic focus:outline-none">I</button>
                            <button type="button" aria-label="Numbered list" class="focus:outline-none">
                                <i class="fas fa-list-ol"></i>
                            </button>
                            <button type="button" aria-label="Bulleted list" class="focus:outline-none">
                                <i class="fas fa-list-ul"></i>
                            </button>
                        </div>
                        <textarea
                            id="course-description"
                            rows="4"
                            placeholder="Insert your course description."
                            class="w-full border border-t-0 border-gray-400 rounded-b-md px-4 py-3 text-gray-700 placeholder-gray-500 resize-none focus:outline-none"
                        ></textarea>
                        <p class="mt-1 text-xs text-gray-600">Mô tả phải có ít nhất 200 từ.</p>
                    </div>

                    <div class="flex space-x-4">
                        <div class="max-w-sm flex-1">
                            <label for="countries1" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select language</label>
                            <select
                                id="countries1"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a language</option>
                                <option value="US">Vietnamese</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div class="max-w-sm flex-1">
                            <label for="countries2" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select level</label>
                            <select
                                id="countries2"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a level</option>
                                <option value="US">Beginner</option>
                                <option value="CA">Intermediate</option>
                                <option value="FR">Expert</option>
                                <option value="DE">All</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex space-x-4">
                        <div class="max-w-sm flex-1">
                            <label for="countries1" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select language</label>
                            <select
                                id="countries1"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a category</option>
                                <option value="US">Vietnamese</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                        <div class="max-w-sm flex-1">
                            <label for="countries2" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select subcategory</label>
                            <select
                                id="countries2"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a subcategory</option>
                                <option value="US">Beginner</option>
                                <option value="CA">Intermediate</option>
                                <option value="FR">Expert</option>
                                <option value="DE">All</option>
                            </select>
                        </div>
                        <div class="max-w-sm flex-1">
                            <label for="countries2" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Select topic</label>
                            <select
                                id="countries2"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a topic</option>
                                <option value="US">Beginner</option>
                                <option value="CA">Intermediate</option>
                                <option value="FR">Expert</option>
                                <option value="DE">All</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    `,
    styles: ``
})
export class EditCourseLandingPageComponent implements OnInit, OnDestroy {
    constructor(private headerService: HeaderControlService) {}

    ngOnInit(): void {
        this.headerService.setControls([
            {
                type: 'button',
                label: 'Save',
                action: () => this.onSave(),
                disabled: false
            },
            {
                type: 'button',
                label: 'Continue',
                action: () => console.log('heelo'),
                disabled: false
            }
        ]);
    }

    onSave() {
        console.log('Saving intended learner...');
    }

    ngOnDestroy(): void {
        this.headerService.clearControls();
    }
}
