import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { ChevronRightEdgeSVG } from "@/assets/icons/chevron-right-edge";
import { Layout } from "@/components/layout/layout";

const Paragraph = () => (
  <p>
    ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui nec odio
    pharetra lobortis. Curabitur auctor, nisl non efficitur tempus, elit libero
    fermentum libero, eu lacinia nunc eros nec nunc. Donec ac nisl nec ipsum
    tincidunt fermentum. Suspendisse potenti. Sed euismod, ex sit amet lacinia
    aliquet, libero nunc fermentum lectus, nec posuere odio libero vitae libero.
    Nulla facilisi. Donec ac nisl nec ipsum tincidunt fermentum. Suspendisse
    potenti. Sed euismod, ex sit amet lacinia aliquet, libero nunc fermentum
    lectus, nec posuere odio libero vitae libero. Nulla facilisi. Donec ac nisl
    nec ipsum tincidunt fermentum. Suspendisse potenti. Sed euismod, ex sit amet
    lacinia aliquet, libero nunc fermentum lectus, nec posuere odio libero vitae
    libero. Nulla facilisi. Donec ac nisl nec ipsum tincidunt fermentum.
    Suspendisse potenti. Sed euismod, ex sit amet lacinia aliquet, libero nunc
    fermentum lectus, nec posuere odio libero vitae libero. Nulla facilisi.
    Donec ac nisl nec ipsum tincidunt fermentum. Suspendisse potenti. Sed
    euismod, ex sit amet lacinia aliquet, libero nunc fermentum lectus, nec
    posuere odio libero vitae libero. Nulla facilisi. Donec ac nisl nec ipsum
    tincidunt
  </p>
);

export const TestPage = () => (
  <Layout>
    <div className="sticky top-0 z-[1] backdrop-blur-md">
      <Layout.Appbar
        left={<ChevronLeftEdgeSVG />}
        content="test page"
        right={<ChevronRightEdgeSVG />}
      />
    </div>
    <Layout.Main>
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <Paragraph key={i} />
        ))}
    </Layout.Main>
  </Layout>
);
