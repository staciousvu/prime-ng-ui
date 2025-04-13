import { Component } from "@angular/core";

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [],
  template: `
    <div class="card-failed">
      <div class="xmark-container">
        <i class="xmark">✕</i>
      </div>
      <h1>Thất bại</h1>
      <p>Thanh toán của bạn không thành công;<br /> Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }

    .card-failed {
      padding: 40px 30px;
      border-radius: 20px;
      text-align: center;
      max-width: 400px;
      width: 100%;
      animation: fadeInUp 0.6s ease-out;
    //   background: #fff5f5;
    }

    .xmark-container {
      border-radius: 200px;
      height: 200px;
      width: 200px;
      background: #ffecec;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .xmark {
      font-size: 100px;
      color: #f44336;
    }

    .card-failed h1 {
      font-size: 36px;
      margin: 20px 0 10px;
      color: #c62828;
    }

    .card-failed p {
      font-size: 16px;
      color: #666666;
      margin: 0;
      line-height: 1.5;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  providers: []
})
export class PaymentFailedComponent {}
