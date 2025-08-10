<template>
  <div class="review-form">
    <!-- Step 1: Basic Company Information -->
    <div v-if="currentStep === 1" class="form-step">
      <div class="form-group">
        <h3>Company Name</h3>
        <input 
          type="text" 
          placeholder="Search for a company"
          v-model="formData.companyName"
        >
      </div>
      
      <div class="form-group">
        <h3>Role</h3>
        <input 
          type="text" 
          placeholder="Enter role name"
          v-model="formData.role"
        >
      </div>
      
      <div class="form-group">
        <h3>Rating</h3>
        <div class="rating-container">
        <StarRating v-model="formData.rating" />
      </div>
      </div>
      
      <div class="form-group">
        <h3>Salary/Allowance $SGD/Month (Optional)</h3>
        <input 
          type="number" 
          placeholder="Enter a number e.g. $500"
          v-model="formData.salary"
        >
      </div>
      
      <div class="form-group">
        <h3>Full Review</h3>
        <textarea 
          placeholder="Tell us what you think (limit 500 words)"
          v-model="formData.fullReview"
        ></textarea>
      </div>
      
      <div class="step-indicator">
        <span>1/3</span>
        <button @click="nextStep" class="next-btn">→</button>
      </div>
    </div>
    
    <!-- Step 2: Interview Details -->
    <div v-if="currentStep === 2" class="form-step">
      <div class="form-group">
        <h3>How long was the interview process?</h3>
        <select v-model="formData.interviewDuration">
          <option disabled value="">Enter...</option>
          <option value="1_week">Less than a week</option>
          <option value="2_weeks">1-2 weeks</option>
          <option value="1_month">3-4 weeks</option>
          <option value="2_months">1-2 months</option>
        </select>
      </div>
      
      <div class="form-group">
        <h3>How long did {{ formData.companyName || "XX Company" }} take to respond?</h3>
        <select v-model="formData.responseTime">
          <option disabled value="">Enter...</option>
          <option value="same_day">Same day</option>
          <option value="few_days">Few days</option>
          <option value="one_week">One week</option>
          <option value="two_weeks">Two weeks</option>
        </select>
      </div>
      
      <div class="form-group">
        <h3>Current stage of application? (Optional)</h3>
        <select v-model="formData.applicationStage">
          <option disabled value="">Enter...</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      <div class="form-group">
        <h3>Your skill sets relevant to this role:</h3>
        <input 
          type="text" 
          placeholder="Add a skill name..."
          v-model="newSkill"
          @keyup.enter="addSkill"
        >
        <div class="skills-container">
          <span v-for="(skill, index) in formData.skills" :key="index" class="skill-tag">
            {{ skill }}
            <button @click="removeSkill(index)" class="remove-btn">×</button>
          </span>
        </div>
      </div>
      
      <div class="step-indicator">
        <button @click="prevStep" class="back-btn">← BACK</button>
        <span>2/3</span>
        <button @click="nextStep" class="next-btn">→</button>
      </div>
    </div>
        
    <!-- Step 3: Rating Questions -->
    <div v-if="currentStep === 3" class="form-step">
      <div class="form-group">
        <h3>How fair was the interview process?</h3>
        <div class="rating-container">
        <StarRating v-model="formData.fairnessRating" /></div>
      </div>
      
      <div class="form-group">
        <h3>How likely are you to recommend this company to a friend?</h3>
        <div class="rating-container">
        <StarRating v-model="formData.recommendationRating" /> </div>
      </div>
      
      <div class="form-group">
        <h3>How difficult was the interview?</h3>
        <div class="rating-container">
        <StarRating v-model="formData.difficultyRating" /> </div>
      </div>
      
      <div class="step-indicator">
        <button @click="prevStep" class="back-btn">← BACK</button>
        <button @click="submitForm" class="submit-btn">SUBMIT</button>
      </div>
    </div>
    
    <!-- Success Screen -->
    <div v-if="currentStep === 4" class="success-screen">
      <div class="success-icon">
        <img src="@/assets/logo.svg" alt="Success" />
      </div>
      <h2>All set!</h2>
      <p>Your review will be sent for approval. Thank you for your contribution!</p>
      <button @click="finishReview" class="finish-btn">FINISH & CLOSE</button>
    </div>
  </div>
</template>

<script>
import StarRating from './StarRating.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'FeedbackForm',
  components: {
    StarRating
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      currentStep: 1,
      newSkill: '',
      formData: {
        companyName: '',
        role: '',
        rating: 0,
        salary: '',
        fullReview: '',
        interviewDuration: '',
        responseTime: '',
        applicationStage: '',
        skills: [],
        fairnessRating: 0,
        recommendationRating: 0,
        difficultyRating: 0
      }
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    addSkill() {
      if (this.newSkill.trim()) {
        this.formData.skills.push(this.newSkill.trim());
        this.newSkill = '';
      }
    },
    removeSkill(index) {
      this.formData.skills.splice(index, 1);
    },
    submitForm() {
      // Here you would typically send the data to your backend
      console.log('Submitting review:', this.formData);
      // Show success screen
      this.currentStep = 4;
    },
    finishReview() {
      // Reset form and navigate to companies page
      this.resetForm();
      this.router.push('/companies');
    },
    resetForm() {
      this.currentStep = 1;
      this.formData = {
        companyName: '',
        role: '',
        rating: 0,
        salary: '',
        fullReview: '',
        interviewDuration: '',
        responseTime: '',
        applicationStage: '',
        skills: [],
        fairnessRating: 0,
        recommendationRating: 0,
        difficultyRating: 0
      };
    }
  }
};
</script>

<style scoped>
.review-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 25px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  font-family: 'League Spartan', sans-serif;
}

.form-step {
  animation: fadeIn 0.3s;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

h3 {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
  color: black;
  font-family: 'League Spartan', sans-serif;
}

/* Center-align only the star rating */
.rating-container {
  display: flex;
  justify-content: center; /* Centers the star rating */
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f5f5f5;
  font-family: 'League Spartan', sans-serif;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'League Spartan', sans-serif;
}

.next-btn {
  background-color: #ff6b48;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
}

.back-btn {
  background-color: transparent;
  color: #666;
}

.submit-btn {
  background-color: #ff6b48;
  color: white;
  padding: 8px 25px;
  border-radius: 25px;
}

.success-screen {
  text-align: center;
  padding: 30px 0;
}

.success-icon {
  margin-bottom: 20px;
}

.success-icon img {
  width: 100px;
  height: 100px;
}

.finish-btn {
  background-color: #ff6b48;
  color: white;
  padding: 10px 25px;
  border-radius: 25px;
  margin-top: 20px;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-tag {
  background-color: #f0f0f0;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.remove-btn {
  background: none;
  border: none;
  margin-left: 5px;
  cursor: pointer;
  padding: 0 5px;
  font-size: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
