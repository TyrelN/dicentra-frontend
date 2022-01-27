import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, shallowMount } from '@vue/test-utils';
import { QBtn } from 'quasar';
import Forms from '../pages/Forms.vue';

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();


