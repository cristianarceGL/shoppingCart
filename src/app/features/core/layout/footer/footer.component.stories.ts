import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './footer.component';
import { MaterialModule } from '@app/shared/material';

export default {
  title: 'Footer Component',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [FooterComponent],
      imports: [BrowserAnimationsModule, CommonModule, MaterialModule, RouterModule],
    }),
  ],
};

export const Default = () => ({
  component: FooterComponent,
});
