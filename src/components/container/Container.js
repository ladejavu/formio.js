import _ from 'lodash';

import {FormioComponents} from '../Components';

export class ContainerComponent extends FormioComponents {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'container';
  }

  build() {
    this.element = this.ce('div', {
      class: `formio-container-component ${this.component.customClass}`
    });
    if (!this.data[this.component.key]) {
      this.data[this.component.key] = {};
    }
    this.addComponents(this.element, this.data[this.component.key]);
  }

  getValue() {
    if (this.viewOnly) {
      return this.value;
    }
    const value = {};
    _.each(this.components, (component) => {
      value[component.component.key] = component.getValue();
    });
    return value;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value || !_.isObject(value)) {
      return;
    }
    _.each(this.components, (component) => {
      if (component.type === 'components') {
        component.setValue(value, flags);
      }
      else if (value.hasOwnProperty(component.component.key)) {
        component.setValue(value[component.component.key], flags);
      }
    });
    this.updateValue(flags);
  }
}
