import { describe, expect, it } from "@jest/globals";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import {
  mount,
} from "@vue/test-utils";
import {
  QBtn,
  QBtnToggle,
  QInput,
} from "quasar";
import { useRouter, useRoute } from "vue-router";
import Forms from "../pages/Forms.vue";
import store from "../store/index.js";
// Specify here Quasar config you'll need to test your component
installQuasarPlugin();
//const testStore = store;

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}));

describe("Forms", () => {
  //setup
  let wrapper = null;
  let mockData = {};

  let setItemSpy, getItemSpy;
  beforeAll(() => {
    setItemSpy = jest.spyOn(global.Storage.prototype, "setItem")
      .mockImplementation((key, value) => {
        mockData[key] = value;
      });
    getItemSpy = jest
      .spyOn(global.Storage.prototype, "getItem")
      .mockImplementation((key) => mockData[key]);
  });
  beforeEach(() => {
    mockData = {};
    useRoute.mockImplementationOnce(() => ({
      params: {
        position: "",
      },
    }));

    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    wrapper = mount(Forms, {
      props: {
        position: "volunteer",
      },
      global: {
        provide: {
          store: store,
        },
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks(); // Only needed if mocking a library
  });

  afterAll(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });
  //tests

  test("should save input in local storage", async () => {
    //const input = wrapper.findAllComponents(QInput)[0];
    expect(global.Storage.prototype.getItem).toHaveBeenCalled();
    const inputs = wrapper.findAllComponents(QInput);
    await inputs[0].trigger("focus", {
        attachTo: inputs[0].element
    });
    await inputs[0].setValue("Johnny");
    expect(inputs[0].vm.modelValue).toEqual("Johnny");
    //triggering blur is not activating local update, so local update is called manually
    await wrapper.vm.localUpdate();
    expect(global.Storage.prototype.setItem).toHaveBeenCalled();
    expect(mockData["contact"]).toContain("Johnny")
    //expect(mockData['contact']).toContain('Johnny');
  });

  test("dynamically renders adopt and foster forms", async () => {
    expect(wrapper.findAllComponents(QInput).length).toBe(26);
    await wrapper
      .findComponent(QBtnToggle)
      .findAllComponents(QBtn)[1]
      .trigger("click");
    expect(wrapper.findAllComponents(QInput).length).toBe(19);
  });
});
