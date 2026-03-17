// ============================================================
// AIT Website – Core Type Definitions
// Follows Interface Segregation & Single Responsibility
// ============================================================

export interface Division {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly description: string;
  readonly icon: string;
  readonly colorAccent: string;
  readonly tier: 1 | 2 | 3;
  readonly products: ReadonlyArray<Product>;
  readonly revenueModel: string;
  readonly targetMarket: string;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly divisionId: string;
  readonly type: 'hardware' | 'software' | 'service' | 'platform';
  readonly status: 'active' | 'beta' | 'coming-soon';
}

export interface TimelineItem {
  readonly year: number;
  readonly title: string;
  readonly description: string;
  readonly milestone: boolean;
}

export interface StatCounter {
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
  readonly prefix?: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: ReadonlyArray<NavItem>;
}

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly company?: string;
  readonly division: string;
  readonly message: string;
}

export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}

export interface CsrfToken {
  readonly token: string;
  readonly expiresAt: number;
}

export type ColorVariant = 'blue' | 'teal' | 'gold' | 'navy';

export type PageProps = {
  readonly params: Promise<Record<string, string>>;
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};
