import type { TransformedToken } from 'style-dictionary';

export interface CreateConfigOptions {
  platform: 'web' | 'android' | 'ios' | 'figma' | 'site/global' | 'site/web' | 'site/android' | 'site/ios';
  source: string[];
  buildPath: string;
  include?: string[];
  platforms?: string[];
  prefix?: string;
  utilities?: UtilityFilesConfig;
  showFileHeader?: boolean;
}

export interface UtilityFilesConfig {
  scss?: {
    'display'?: string;
    'media-queries'?: string;
    'container-queries'?: string;
    'deprecate'?: string;
  };
  less?: {
    'display'?: string;
    'media-queries'?: string;
    'container-queries'?: string;
  };
}

export interface PlatformConfig {
  prefix?: string;
  buildPath: string;
  options?: {
    showFileHeader?: boolean;
  };
  [key: string]: any; // Allow additional properties
}

export type TokenType = 
  | 'color' 
  | 'dimension' 
  | 'fontSize' 
  | 'fontWeight'
  | 'lineHeight'
  | 'clamp'
  | string;

export interface TransformConfig {
  basePxFontSize?: number;
  [key: string]: any;
}

export interface CedarToken extends TransformedToken {
  $type?: TokenType;
  spacingModifier?: number;
  mixin?: string;
  newMixin?: string;
  newToken?: string;
  property?: string;
  'utility-class'?: boolean;
  docs?: {
    category?: string;
    type?: string;
  };
  attributes?: {
    deprecated?: boolean;
    'deprecated-year'?: number;
    'deprecated-release'?: string;
  };
}
