import { ProjectConfig } from '../models/project-config';

export const PROJECT_CONFIG_DEFAULT: ProjectConfig = {
    backgroundColor: '#eed',
    fontColor: '#111',
    fontUrl: `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');`,
    fontFamily: `'Roboto', sans-serif;`,
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '12px auto',
    },
    paragraph: {
        fontSize: '14px',
        fontWeight: 'regular',
        margin: '0px auto',
    },
};
