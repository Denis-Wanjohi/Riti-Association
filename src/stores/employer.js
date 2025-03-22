import { defineStore } from 'pinia';

export const useEmployerStore = defineStore('employer', {
    state: () => ({
        employer: null,
        selectedEmployer: null,
    }),
    actions: {
        setEmployer(employer) {
            this.employer = employer;
        },
        removeEmployer(id) {
            this.employers = this.employers.filter(employer => employer.id !== id);
        },
        selectEmployer(employer) {
            this.selectedEmployer = employer;
        },
        clearSelectedEmployer() {
            this.selectedEmployer = null;
        },
    },
    getters: {
        // employerCount: (state) => state.employers.length,
        // isEmployerSelected: (state) => !!state.selectedEmployer,
    },
});