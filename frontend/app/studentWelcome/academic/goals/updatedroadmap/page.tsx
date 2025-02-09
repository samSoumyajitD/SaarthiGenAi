"use client";
import { ChevronDown, CheckCircle, XCircle, Award, PlayCircle, Brain, Trophy } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import roadmapData from '../../../../../rd/roadmap.json';
import StuNavBar from '@/components/CommonComponents/WelcomePageNav';

interface NptelCourse {
  "Course Name": string;
  "Institute": string;
  "Duration": string;
  "NPTEL URL": string;
}

interface WeekData {
  week: number;
  goals: string[];
  topics: string[];
  suggested_yt_videos: string[];
  suggested_nptel_certifications: NptelCourse[];
}

const RoadmapPage: React.FC = () => {
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
  const [courseProgress, setCourseProgress] = useState<number>(0);

  useEffect(() => {
    const totalGoals = roadmapData.reduce((total, weekData) => total + weekData.goals.length, 0);
    const completedGoals = roadmapData.reduce(
      (total, weekData) => total + weekData.goals.filter((goal) => progress[`${weekData.week}-${goal}`]).length,
      0
    );
    setCourseProgress((completedGoals / totalGoals) * 100);
  }, [progress]);

  const handleGoalCompletion = (week: number, goal: string) => {
    setProgress((prev) => {
      const updatedProgress = { ...prev, [`${week}-${goal}`]: !prev[`${week}-${goal}`] };
      return updatedProgress;
    });
  };

  const calculateProgress = (weekData: WeekData) => {
    const completedGoals = weekData.goals.filter(
      (goal) => progress[`${weekData.week}-${goal}`]
    ).length;
    return (completedGoals / weekData.goals.length) * 100;
  };

  const handleCardClick = (weekData: WeekData) => {
    setSelectedWeek(weekData);
  };

  const closeModal = () => {
    setSelectedWeek(null);
  };

  const handleStartQuiz = (week: number) => {
    console.log(`Starting quiz for week ${week}`);
  };

  const handleFinalAssessment = () => {
    console.log('Starting final assessment');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <StuNavBar />
      <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
  Updated Roadmap for Academic Success: Mastering DSA in C++
</h1>
<p className="text-center text-red-600 dark:text-red-300 mb-8">
  Based on your quiz results, we've tailored an updated and optimized roadmap to help you excel in Data Structures and Algorithms (DSA) using C++. Follow this structured path to achieve academic excellence and strengthen your programming foundation.
</p>

        {/* Global Progress Bar */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Course Progress</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {Math.round(courseProgress)}% completed
          </p>
        </div>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapData.map((weekData: WeekData) => {
            const weekProgress = calculateProgress(weekData);

            return (
              <div key={weekData.week} className="mb-6">
                <motion.div
                  className={`bg-white dark:bg-gray-700 rounded-lg shadow-md cursor-pointer ${
                    weekProgress === 100 ? 'bg-green-200 dark:bg-green-600' : 'bg-white dark:bg-gray-700'
                  }`}
                  onClick={() => handleCardClick(weekData)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Week {weekData.week}</h2>
                    <motion.span
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="text-gray-700 dark:text-gray-300" />
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Final Assessment Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.button
            onClick={handleFinalAssessment}
            className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-lg font-semibold">Take Final Assessment</span>
          </motion.button>
        </motion.div>

        {/* Modal for Week Details */}
        <AnimatePresence>
          {selectedWeek && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full h-full lg:w-3/4 lg:h-3/4 p-6 transform overflow-y-auto relative"
                initial={{ scale: 0.9, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.9, rotate: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white transform transition-all duration-300 hover:scale-105">
                    Week {selectedWeek.week} Details
                  </h2>
                  <motion.button
                    onClick={() => handleStartQuiz(selectedWeek.week)}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Brain className="w-5 h-5" />
                    <span>Start Quiz</span>
                  </motion.button>
                </div>
                
                <motion.button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 text-2xl transform transition-all duration-200 hover:rotate-45"
                >
                  <XCircle />
                </motion.button>

                {/* Goals Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Goals</h3>
                  <ul className="space-y-2">
                    {selectedWeek.goals.map((goal) => (
                      <motion.li
                        key={goal}
                        className="flex items-center transform transition-all duration-300 hover:scale-105"
                      >
                        <motion.input
                          type="checkbox"
                          checked={progress[`${selectedWeek.week}-${goal}`]}
                          onChange={() => handleGoalCompletion(selectedWeek.week, goal)}
                          className="mr-2"
                          whileTap={{ scale: 1.1 }}
                        />
                        <span
                          className={`${
                            progress[`${selectedWeek.week}-${goal}`]
                              ? 'text-green-500 dark:text-green-400'
                              : 'text-gray-700 dark:text-gray-400'
                          } text-lg`}
                        >
                          {goal} {progress[`${selectedWeek.week}-${goal}`] ? <CheckCircle className="inline text-green-500" /> : <XCircle className="inline text-red-500" />}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Topics Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Topics</h3>
                  <ul className="list-disc list-inside space-y-4">
                    {selectedWeek.topics.map((topic, index) => (
                      <motion.li
                        key={topic}
                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 text-lg transform transition-all duration-300 hover:scale-105 hover:text-yellow-500 hover:shadow-lg cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="text-white text-xl" />
                        </motion.div>
                        
                        <span className="flex-1">{topic}</span>

                        <motion.div
                          className="w-16 h-2 bg-gray-300 dark:bg-gray-600 rounded-full relative"
                          style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        >
                          <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full"></div>
                        </motion.div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* YouTube Videos Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Suggested YouTube Videos</h3>
                  <ul className="space-y-4">
                    {selectedWeek.suggested_yt_videos.map((videoUrl, index) => {
                      const videoId = new URL(videoUrl).searchParams.get("v");
                      const videoThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                      return (
                        <motion.li
                          key={index}
                          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                            <img src={videoThumbnail} alt={`Video ${index + 1} Thumbnail`} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1">
                            <a
                              href={videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 dark:text-blue-400 hover:underline text-lg font-medium"
                            >
                              {`Video ${index + 1}`}
                            </a>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              Click to watch the full video on YouTube.
                            </p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* NPTEL Certifications Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white transform transition-all duration-300 hover:scale-105 hover:text-yellow-500">
                    Suggested NPTEL Certifications and Courses
                  </h3>
                  <ul className="space-y-2">
                    {selectedWeek.suggested_nptel_certifications.map((course) => (
                      <motion.li
                        key={course["Course Name"]}
                        className="p-4 rounded-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 hover:text-white"
                        whileHover={{
                          scale: 1.05,
                          rotate: 3,
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center space-x-3">
                          <PlayCircle className="text-blue-500 dark:text-blue-400 text-lg" />
                          <a
                            href={course["NPTEL URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold hover:underline"
                          >
                            {course["Course Name"]} - {course.Institute} ({course.Duration})
                          </a>
                        </div>
                        <motion.div
                          className="mt-2 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"
                          style={{ width: `10px` }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoadmapPage;