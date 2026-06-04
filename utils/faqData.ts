import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  {
    question: 'What is BMI?',
    answer: 'BMI (Body Mass Index) is a numerical value calculated from your weight and height. It provides a simple screening measure of body fatness. The formula is: BMI = weight (kg) / height (m)². It was developed by Belgian mathematician Adolphe Quetelet in the 1830s and is widely used by healthcare professionals as an initial assessment tool.',
  },
  {
    question: 'How accurate is BMI?',
    answer: 'BMI is a useful screening tool but has limitations. It does not directly measure body fat and cannot distinguish between muscle mass and fat mass. Athletes or muscular individuals may have a high BMI despite having low body fat. Similarly, older adults who have lost muscle mass may have a normal BMI but carry excess fat. BMI should be used alongside other health indicators for a complete picture.',
  },
  {
    question: 'What is a healthy BMI range?',
    answer: 'According to the World Health Organization (WHO), a healthy BMI range is 18.5 to 24.9. Below 18.5 is considered underweight, 25.0 to 29.9 is overweight, and 30.0 or above is classified as obese. However, these ranges are general guidelines and may vary based on factors like age, sex, ethnicity, and muscle mass.',
  },
  {
    question: 'Why is my BMI different from my doctor\'s measurement?',
    answer: 'Slight differences can occur due to rounding, the time of day you weigh yourself, clothing, hydration levels, and the precision of measuring equipment. Doctors may also use clinical-grade scales and stadiometers for more accurate measurements. For the most consistent results, weigh yourself at the same time of day under similar conditions.',
  },
  {
    question: 'Does BMI apply to athletes?',
    answer: 'BMI may not be the best measure for athletes or highly muscular individuals. Muscle tissue is denser than fat, so athletes often have a high BMI despite having low body fat percentage. For athletes, body fat percentage measurements, waist circumference, or DEXA scans provide more accurate assessments of body composition.',
  },
  {
    question: 'Is BMI different for men and women?',
    answer: 'The standard BMI formula and categories are the same for both men and women. However, women naturally have more body fat than men at the same BMI. This is why additional metrics like body fat percentage (which this app calculates using the Deurenberg formula that accounts for gender) can provide more nuanced insights.',
  },
  {
    question: 'How often should I check my BMI?',
    answer: 'For general health monitoring, checking your BMI once a month is sufficient. If you are actively working on weight management, weekly checks can help track progress, but daily measurements are not recommended as weight fluctuates naturally day to day. Focus on long-term trends rather than short-term changes.',
  },
  {
    question: 'What is BMI Prime?',
    answer: 'BMI Prime is the ratio of your BMI to the upper limit of the normal BMI range (25). A BMI Prime of 1.0 means you are at the upper boundary of normal weight. Values below 1.0 indicate you are within or below normal weight, while values above 1.0 indicate overweight or obesity. It provides a quick way to see how far you are from the normal range.',
  },
  {
    question: 'What is Ponderal Index?',
    answer: 'The Ponderal Index (also called Rohrer\'s Index) is similar to BMI but uses the cube of height instead of the square: PI = weight / height³. This makes it more suitable for comparing individuals of very different heights. A normal Ponderal Index is typically between 11 and 15 kg/m³.',
  },
  {
    question: 'How is body fat percentage estimated?',
    answer: 'This app uses the Deurenberg formula to estimate body fat percentage: BF% = (1.20 × BMI) + (0.23 × Age) - (10.8 × Gender) - 5.4, where Gender is 1 for males and 0 for females. This is an estimate and may not be as accurate as methods like DEXA scans, bioelectrical impedance, or skinfold measurements.',
  },
  {
    question: 'What is BMR and how is it calculated?',
    answer: 'BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic life-sustaining functions at rest, like breathing and circulation. This app uses the Mifflin-St Jeor equation: For males: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5. For females: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161.',
  },
  {
    question: 'Can children use this app?',
    answer: 'While children can physically use the app, standard adult BMI categories do not apply to children and teenagers (under 18). Pediatric BMI is calculated differently and is based on age- and sex-specific percentile charts. For children\'s health assessments, please consult a pediatrician who can use appropriate growth charts.',
  },
  {
    question: 'Is my data shared with anyone?',
    answer: 'No. All your data (measurements, history, preferences) is stored locally on your device using AsyncStorage. We do not collect, transmit, or share any personal health data with third parties. Your privacy is our priority. The only data that may be collected is anonymous usage analytics (if enabled in Phase 2) to improve the app experience.',
  },
  {
    question: 'How do I delete my data?',
    answer: 'You can delete your data from the Settings screen. To clear your BMI history, go to Settings > Clear All History. To reset all app settings, go to Settings > Reset Settings. To completely remove all data, you can also uninstall the app, which will remove all locally stored data.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach us through the Contact/Feedback screen in the app (Settings > Contact). Send us an email at support@bmicalculator.app with any questions, feedback, or bug reports. We aim to respond within 48 hours.',
  },
  {
    question: 'What units does the app support?',
    answer: 'The app supports both Metric (kg, cm) and Imperial (lbs, ft/in) units. You can toggle between them in the Settings screen or directly on the calculator input fields. All calculations are performed in metric units internally and converted for display.',
  },
];
