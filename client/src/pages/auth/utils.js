export default {
    firstName: [
        {
            required: true,
            message: 'Please input first name',
            trigger: 'blur',
        },
        {
            min: 3,
            max: 15,
            message: 'Length should be 3 to 15',
            trigger: 'blur',
        },
    ],
    lastName: [
        {
            required: true,
            message: 'Please input first name',
            trigger: 'blur',
        },
        {
            min: 3,
            max: 15,
            message: 'Length should be 3 to 15',
            trigger: 'blur',
        },
    ],
    username: [
        {
            required: true,
            message: 'Please input username',
            trigger: 'blur',
        },
        {
            min: 4,
            max: 10,
            message: 'Length should be 4 to 10',
            trigger: 'blur',
        },
    ],
    email: [
        {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
        },
        {
            min: 5,
            max: 150,
            message: 'Length should be 5 to 150',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
        },
        {
            min: 6,
            message: 'Length should be at least 6',
            trigger: 'blur',
        },
    ],
};
