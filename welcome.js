function toggleEditMode() {
    let isEditMode = document.getElementById('editProfileBtn').innerText === 'Save Changes';
    let fields = ['name', 'email', 'phone', 'profession'];

    if (isEditMode) {
        fields.forEach(field => {
            let input = document.getElementById(`${field}Input`);
            let p = document.getElementById(field);
            p.innerText = input.value;
            input.remove();
        });
        document.getElementById('editProfileBtn').innerText = 'Edit Profile';
    } else {
        fields.forEach(field => {
            let p = document.getElementById(field);
            let input = document.createElement('input');
            input.type = 'text';
            input.value = p.innerText;
            input.id = `${field}Input`;
            p.innerHTML = '';
            p.appendChild(input);
        });
        document.getElementById('editProfileBtn').innerText = 'Save Changes';
    }
}