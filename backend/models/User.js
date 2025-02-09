const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Working_Pro', 'Admin'], default: 'Student' },
    status: { type: String, enum: ['Active', 'Blocked', 'Pending', 'Inactive'], default: 'Pending' },

    // Profile Fields
    organization: { type: String, default: '' }, // University/Company Name
    currentPosition: { type: String, default: '' }, // Role/Designation or Student
    fieldOfStudyOrWork: { type: String, default: '' }, // E.g., Computer Science, Data Science, Finance
    expertiseLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    
    // Learning Style & Preferences
    preferredLearningStyle: { type: String, enum: ['Videos', 'Articles', 'Both'], default: 'Both' },
    takesNotes: { type: Boolean, default: false },
    learningType: { type: String, enum: ['Self-paced', 'Structured'], default: 'Self-paced' },
    endGoal: { type: String, default: '' }, // E.g., "Become a Full Stack Developer", "Crack FAANG interview"

    // Additional Behavioral Insights
    timeSpentLearningPerWeek: { type: String, enum: ['<5 hrs', '5-10 hrs', '10-20 hrs', '20+ hrs'], default: '<5 hrs' },
    preferredLearningTime: { type: String,  default: 'Evening' },
    prefersGroupLearning: { type: Boolean, default: false }, // Solo vs. Collaborative Learning
    interestAreas: [{ type: String }], // E.g., ["Web Development", "Machine Learning", "Cybersecurity"]
    tellSomethingAboutYou:{ type: String, default: '' }
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
