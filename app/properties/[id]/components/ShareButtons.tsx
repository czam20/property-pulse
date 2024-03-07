import { PropertyProps } from "@/types/properties-types";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

type ShareButtonsProps = {
  property: PropertyProps;
};

export default function ShareButtons(props: ShareButtonsProps) {
  const { property } = props;
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <div className="my-2">
      <h3 className="text-base font-bold text-center mb-2">
        Share this property:
      </h3>
      <div className="flex gap-3 justify-center">
        <FacebookShareButton
          url={shareUrl}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
          title={property.name}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={"Check out this property listing: "}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
