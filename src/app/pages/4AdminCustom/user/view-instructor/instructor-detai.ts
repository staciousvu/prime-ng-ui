import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { ToastService } from '../../../service/toast.service';

@Component({
    selector: 'app-view-instructor-detail',
    standalone: true,
    imports: [TabsModule, ButtonModule, CommonModule, FormsModule, TableModule,RouterLink],
    styles: `
    
    `,
    template: `
        <div class="min-h-screen">
            <h2 class="text-center">Xem chi tiết tài khoản</h2>
  <div class="w-full mx-auto bg-white shadow rounded-lg overflow-hidden">
    
    <!-- Header -->
    <div class=" h-24"></div>

    <!-- Info -->
    <div class="px-6 -mt-20 flex items-center space-x-6">
      <img [src]="user.avatar" alt="Avatar"
           class="h-24 w-24 rounded-full ring-4 ring-white bg-gray-200 object-cover" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ user.firstName }} {{ user.lastName }}
        </h1>
        <p class="text-sm text-gray-500">Chuyên môn: {{ user.expertise }}</p>
      </div>
    </div>

    <!-- Body -->
    <div class="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Left: Personal Info -->
      <div class="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
        <h2 class="text-lg font-semibold text-gray-800">Thông tin cá nhân</h2>
        <div class="text-sm text-gray-700 space-y-2">
          <p>Email: {{ user.email }}</p>
          <p>Ngày sinh: {{ user.dateOfBirth | date }} ({{ calculateAge(user.dateOfBirth) }} tuổi)</p>
          <p>Địa chỉ: {{ user.address }}, {{ user.country }}</p>
          <p>Trạng thái: 
            <span [class.text-green-600]="user.isEnabled" 
                  [class.text-red-600]="!user.isEnabled">
              {{ user.isEnabled ? 'Hoạt động' : 'Không hoạt động' }}
            </span>
          </p>
        </div>

        <!-- Mạng xã hội -->
        <div *ngIf="hasSocialLinks()" class="pt-4 border-t border-gray-200">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Mạng xã hội</h3>
          <div class="flex flex-wrap gap-2 text-sm text-blue-600">
            <a *ngIf="user.githubUrl" [href]="user.githubUrl" target="_blank">GitHub</a>
            <a *ngIf="user.linkedinUrl" [href]="user.linkedinUrl" target="_blank">LinkedIn</a>
            <a *ngIf="user.twitterUrl" [href]="user.twitterUrl" target="_blank">Twitter</a>
            <a *ngIf="user.facebookUrl" [href]="user.facebookUrl" target="_blank">Facebook</a>
            <a *ngIf="user.instagramUrl" [href]="user.instagramUrl" target="_blank">Instagram</a>
          </div>
        </div>


      </div>

      <!-- Right: Account Info + Expertise -->
      <div class="md:col-span-2 space-y-6">

  <!-- Account Info -->
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <h2 class="text-md font-semibold text-gray-800 mb-3">Thông tin tài khoản</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <div>
        <p><strong>ID:</strong> #{{ user.id }}</p>
        <p><strong>Ngày tạo:</strong> {{ user.createdAt | date }}</p>
      </div>
      <div>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Quốc gia:</strong> {{ user.country }}</p>
      </div>
    </div>
  </div>

  <!-- Expertise -->
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <h2 class="text-md font-semibold text-gray-800 mb-3">Lĩnh vực giảng dạy</h2>
    <div class="flex flex-wrap gap-2">
      <span *ngFor="let skill of user.expertise.split(',')" 
            class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
        {{ skill.trim() }}
      </span>
    </div>
  </div>

  <!-- Account Control Buttons -->
  <div class="bg-white rounded-lg shadow-sm flex justify-end">
    <button
      *ngIf="user.isEnabled; else unlockBtn"
      (click)="deactivateAccount(user.id)"
      class="w-full px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium rounded-lg transition">
      Hủy kích hoạt tài khoản
    </button>

    <ng-template #unlockBtn>
      <button
        (click)="activateAccount(user.id)"
        class="w-full px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium rounded-lg transition">
        Mở khóa tài khoản
      </button>
    </ng-template>
  </div>
</div>


   
    </div>

    <!-- Danh sách khóa học đang giảng dạy -->
    <div class="border-t border-gray-200 px-6 py-6">
  <h2 class="text-lg font-semibold text-gray-900 mb-4">Khóa học đang giảng dạy</h2>

  <div *ngIf="courses && courses.length > 0; else noCourses" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div *ngFor="let course of courses" class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
      
      <!-- Course Image -->
      <img [src]="course.thumbnail || 'assets/default-course.jpg'" alt="{{ course.title }}"
           class="w-full h-40 object-cover" />

      <!-- Course Info -->
      <div class="p-4 space-y-2">
        <h3 class="text-xl font-bold text-gray-800 line-clamp-2">{{ course.title }}</h3>

        <p class="text-sm text-gray-500 line-clamp-2">{{ course.subtitle }}</p>

        <div class="text-sm text-gray-600">
          <p>Học viên: <span class="font-medium text-blue-600">{{ course.countEnrolled }}</span></p>
        </div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-black-600 font-bold">{{ course.price | currency:'VND' }}</span>
          <a [routerLink]="['/admin/courses', course.id]" class="text-blue-600 text-sm hover:underline">Xem chi tiết</a>
        </div>
      </div>
    </div>
  </div>

  <ng-template #noCourses>
    <p class="text-sm text-gray-500 italic">Giảng viên này hiện chưa có khóa học nào.</p>
  </ng-template>
</div>


  </div>
</div>


    `,
    providers: []
})
export class ViewInstructorDetailComponent implements OnInit{
  userId:any;
  user:any;
  constructor(private http:HttpClient,
    private route:ActivatedRoute,
    private toastService:ToastService
  ){}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:8080/user/info/${this.userId}`).subscribe(
      (response) =>{
        this.user = response.data;
      }
    )
    this.http.get<any>(`http://localhost:8080/instructor/my-courses/instructor/${this.userId}`).subscribe(
      (response) =>{
        this.courses = response.data;
      }
    )
  }
   courses :any[]=[];

    instructor = {
    id: 123,
    first_name: 'John',
    last_name: 'Doe',
    active: true,
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    address: '123 Main Street',
    country: 'USA',
    date_of_birth: '1985-06-15',
    expertise: 'Mathematics, Physics, Computer Science',
    bio: 'John has over 15 years of experience in teaching. He loves helping students understand complex topics with ease.',
    github_url: 'https://github.com/johndoe',
    linkedin_url: 'https://linkedin.com/in/johndoe',
    twitter_url: '',
    facebook_url: '',
    instagram_url: '',
    cv_url: 'https://example.com/cv.pdf',
    created_at: '2020-01-10',
    is_enabled: true
  };

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  hasSocialLinks(): boolean {
  return !!(this.instructor.github_url || this.instructor.linkedin_url || this.instructor.twitter_url || this.instructor.facebook_url || this.instructor.instagram_url);
}
activateAccount(id: number) {

        this.http.put(`http://localhost:8080/admin/${id}/toggle-active`, {}).subscribe(
            () => {
              this.user.isEnabled=true;
              this.toastService.addToast("success","Mở khóa tài khoản thành công")
            },
            (error) => {
              this.toastService.addToast("error","Mở khóa tài khoản thất bại")
            }
        );
}

deactivateAccount(id: number) {
  this.http.put(`http://localhost:8080/admin/${id}/toggle-active`, {}).subscribe(
            () => {
              this.user.isEnabled=false;
              this.toastService.addToast("success","Khóa tài khoản thành công")
            },
            (error) => {
              this.toastService.addToast("error","Khóa tài khoản thất bại")
            }
        );
}


}
