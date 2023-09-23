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
        fontWeight: '400',
        margin: '0px auto',
    },
    divider: {
        fontSize: '',
        fontWeight: '',
        margin: '1rem 0',
    },
    callout: {
        fontSize: '14px',
        fontWeight: '400',
        margin: '1rem',
    },
    listItem: {
        fontSize: '14px',
        fontWeight: '400',
        margin: '1rem 0',
    },
    todoItem: {
        fontSize: '14px',
        fontWeight: '400',
        margin: '1rem 0',
    },
    image: {
        fontSize: '12px',
        fontWeight: '400',
        margin: '1rem auto',
    },
    file: {
        fontSize: '12px',
        fontWeight: '400',
        margin: '1rem auto',
    },
};
