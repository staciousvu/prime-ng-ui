import { Component } from "@angular/core";


@Component({
    selector: 'app-payment-successsuccess',
    standalone:true,
    imports:[],
    template: `
    <div class="card-success">
  <div class="checkmark-container">
    <i class="checkmark">✓</i>
  </div>
  <h1>Thành công</h1>
  <p>Chúng tôi đã thanh toán yêu cầu của bạn;<br /> Vui lòng trải nghiệm khóa học mới !</p>
</div>

    `,
    styles:`
    :host {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.card-success {
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: fadeInUp 0.6s ease-out;
}

.checkmark-container {
  border-radius: 200px;
  height: 200px;
  width: 200px;
  background: #f8faf5;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkmark {
  font-size: 100px;
  color: #4caf50;
}

.card-success h1 {
  font-size: 36px;
  margin: 20px 0 10px;
  color: #333333;
}

.card-success p {
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
    providers:[]
})
export class PaymentSuccessComponent{

}