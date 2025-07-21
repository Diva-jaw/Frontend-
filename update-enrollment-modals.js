const fs = require('fs');
const path = require('path');

// List of course pages that need to be updated
const coursePages = [
  'DataScienceLevel3.tsx',
  'AIMLLevel1.tsx',
  'AIMLLevel2.tsx',
  'AIMLLevel3.tsx',
  'WebUIDesignLevel2.tsx',
  'WebUIDesignLevel3.tsx',
  'DigitalMarketingLevel1.tsx',
  'DigitalMarketingLevel2.tsx',
  'DigitalMarketingLevel3.tsx',
  'SalesMarketingLevel1.tsx',
  'SalesMarketingLevel2.tsx',
  'SalesMarketingLevel3.tsx',
  'ProductManagementLevel1.tsx',
  'ProductManagementLevel2.tsx',
  'ProductManagementLevel3.tsx',
  'MechanicalCADLevel1.tsx',
  'MechanicalCADLevel2.tsx',
  'MechanicalCADLevel3.tsx',
  'GraphicVideoDesignLevel1.tsx',
  'GraphicVideoDesignLevel2.tsx',
  'GraphicVideoDesignLevel3.tsx',
  'WebDevelopmentEssentials.tsx',
  'ReactJSDetails.tsx',
  'AngularDetails.tsx',
  'TailwindDetails.tsx',
  'ReactNativeDetails.tsx',
  'FlutterDetails.tsx',
  'SwiftDetails.tsx',
  'NodeExpressDetails.tsx',
  'JavaSpringDetails.tsx',
  'PythonDjangoDetails.tsx',
  'GoGinDetails.tsx',
  'DartServerDetails.tsx',
  'PythonFlaskFastAPIDetails.tsx',
  'JavaKotlinBackendDetails.tsx',
  'JavaAndroidDetails.tsx'
];

// Course name mappings
const courseNameMappings = {
  'DataScienceLevel1': { course: 'Data Science', level: 'Level 1' },
  'DataScienceLevel2': { course: 'Data Science', level: 'Level 2' },
  'DataScienceLevel3': { course: 'Data Science', level: 'Level 3' },
  'AIMLLevel1': { course: 'AI and Machine Learning', level: 'Level 1' },
  'AIMLLevel2': { course: 'AI and Machine Learning', level: 'Level 2' },
  'AIMLLevel3': { course: 'AI and Machine Learning', level: 'Level 3' },
  'WebUIDesignLevel1': { course: 'Web & UI/UX Design', level: 'Level 1' },
  'WebUIDesignLevel2': { course: 'Web & UI/UX Design', level: 'Level 2' },
  'WebUIDesignLevel3': { course: 'Web & UI/UX Design', level: 'Level 3' },
  'DigitalMarketingLevel1': { course: 'Digital Marketing', level: 'Level 1' },
  'DigitalMarketingLevel2': { course: 'Digital Marketing', level: 'Level 2' },
  'DigitalMarketingLevel3': { course: 'Digital Marketing', level: 'Level 3' },
  'SalesMarketingLevel1': { course: 'Sales & Marketing', level: 'Level 1' },
  'SalesMarketingLevel2': { course: 'Sales & Marketing', level: 'Level 2' },
  'SalesMarketingLevel3': { course: 'Sales & Marketing', level: 'Level 3' },
  'ProductManagementLevel1': { course: 'Product Management', level: 'Level 1' },
  'ProductManagementLevel2': { course: 'Product Management', level: 'Level 2' },
  'ProductManagementLevel3': { course: 'Product Management', level: 'Level 3' },
  'MechanicalCADLevel1': { course: 'Mechanical and CAD Design', level: 'Level 1' },
  'MechanicalCADLevel2': { course: 'Mechanical and CAD Design', level: 'Level 2' },
  'MechanicalCADLevel3': { course: 'Mechanical and CAD Design', level: 'Level 3' },
  'GraphicVideoDesignLevel1': { course: 'Graphic and Video Content Design', level: 'Level 1' },
  'GraphicVideoDesignLevel2': { course: 'Graphic and Video Content Design', level: 'Level 2' },
  'GraphicVideoDesignLevel3': { course: 'Graphic and Video Content Design', level: 'Level 3' },
  'WebDevelopmentEssentials': { course: 'Web Development Essentials', level: '' },
  'ReactJSDetails': { course: 'React.js Development', level: '' },
  'AngularDetails': { course: 'Angular Development', level: '' },
  'TailwindDetails': { course: 'Tailwind CSS', level: '' },
  'ReactNativeDetails': { course: 'React Native Development', level: '' },
  'FlutterDetails': { course: 'Flutter Development', level: '' },
  'SwiftDetails': { course: 'Swift Development', level: '' },
  'NodeExpressDetails': { course: 'Node.js with Express.js', level: '' },
  'JavaSpringDetails': { course: 'Java with Spring Boot', level: '' },
  'PythonDjangoDetails': { course: 'Python with Django', level: '' },
  'GoGinDetails': { course: 'Go with GIN Framework', level: '' },
  'DartServerDetails': { course: 'Dart Server Development', level: '' },
  'PythonFlaskFastAPIDetails': { course: 'Python with Flask/FastAPI', level: '' },
  'JavaKotlinBackendDetails': { course: 'Java/Kotlin Backend Development', level: '' },
  'JavaAndroidDetails': { course: 'Java for Android Development', level: '' }
};

console.log('Course pages to update:', coursePages.length);
console.log('Course name mappings:', Object.keys(courseNameMappings).length);

// This script provides the mappings and file list for manual updates
// You can use these mappings to update each file manually or create a more sophisticated script 