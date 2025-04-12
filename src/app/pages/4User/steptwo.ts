import { Component, EventEmitter, Output } from "@angular/core";



@Component({
    selector: 'app-steptwo',
    standalone:true,
    imports: [],
    template: `
    <div class="progress-wrapper">
    <div class="progress-bar"></div>
  </div>
  

  <!-- Main Content -->
  <div class="container">
    <div class="question-box">
      Answer a few questions to improve your content recommendations
    </div>

    <h2>What field are you learning for?</h2>

    <form>
      <div class="grid">
        <label><input type="radio" name="field"> Software Development</label>
        <label><input type="radio" name="field"> Human Resources</label>
        <label><input type="radio" name="field"> Data & Analytics</label>
        <label><input type="radio" name="field"> Education & Training</label>
        <label><input type="radio" name="field"> Information Technology</label>
        <label><input type="radio" name="field"> Customer Support</label>
        <label><input type="radio" name="field"> Marketing</label>
        <label><input type="radio" name="field"> Health & Wellness</label>
        <label><input type="radio" name="field"> Design</label>
        <label><input type="radio" name="field"> Writing</label>
        <label><input type="radio" name="field"> Finance & Accounting</label>
        <label><input type="radio" name="field"> Legal</label>
        <label><input type="radio" name="field"> Product & Project Management</label>
        <label><input type="radio" name="field"> Art</label>
        <label><input type="radio" name="field"> Business Operations</label>
        <label><input type="radio" name="field"> None of the above</label>
        <label><input type="radio" name="field"> Sales & Business Development</label>
        <label><input type="radio" name="field"> Health & Wellness</label>
        <label><input type="radio" name="field"> Design</label>
        <label><input type="radio" name="field"> Writing</label>
        <label><input type="radio" name="field"> Finance & Accounting</label>


      </div>
    </form>
  </div>

  <!-- Footer -->
  <div class="footer">
    <button type="submit" class="back-btn" (click)="prev.emit()">Back</button>
    <button type="submit" class="next-btn">Submit</button>
  </div>
    `,
    styles:`
    /* Main container */
    .container {
      max-width: 800px;
      margin: 100px auto;
            padding: 50px;
            padding-top: 10px;
            padding-bottom: 100px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    }

    .question-box {
      background-color: #fff5e6;
      padding: 15px 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      font-size: 16px;
    }

    h2 {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 25px;
      color: #222;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 40px;
      margin-bottom: 30px;
    }

    label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    input[type="radio"] {
      margin-right: 10px;
    }

    .sub-question {
      margin-top: 30px;
      font-weight: bold;
    }

    /* Footer */
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: white;
      border-top: 1px solid #ddd;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      z-index: 1000;
    }

    .next-btn {
      padding: 12px 24px;
      background-color: #6a1b9a;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }
    .back-btn {
      padding: 12px 24px;
      background-color: #6a1b9a;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }

    .next-btn:hover,.back-btn:hover {
      background-color: #4a148c;
    }
    /* Progress Bar */
.progress-wrapper {
    position: fixed;
    top: 60px; /* ngay dưới header cao 60px */
    left: 0;
    width: 100%;
    background-color: #eee;
    height: 6px;
    z-index: 999;
  }
  
  .progress-bar {
    height: 100%;
    width: 100%; /* hoặc 100% tùy bước */
    background-color: #a435f0; /* tím Udemy */
    transition: width 0.3s ease;
  }
    `
})
export class StepTwoComponent{
  @Output() prev = new EventEmitter<void>();
}