import Container from "./og_container";
import cn from "classnames";

type AlertContent = {
  message: string;
  linkText: string;
  linkHref: string;
};

const alertContent: AlertContent = {
  message: "Discover the power of nature-inspired AI for your business.",
  linkText: "Learn More",
  linkHref: "/contact",
};

const Alert = () => {
  return (
    <div
      className={cn("border-b bg-[#6231f0] border-[#6231f0] text-white")}
    >
      <Container>
        <div className="py-3 text-center">
          <span className="text-sm font-medium">{alertContent.message}</span>{" "}
          <a
            href={alertContent.linkHref}
            className={cn(
              "text-sm font-semibold underline duration-200 transition-colors hover:bg-gradient-to-r from-[#6231f0]/60 via-[#8e44ad]/60 to-[#9b59b6]/60 hover:text-white"
               )}
          >
            {alertContent.linkText}
          </a>
          .
        </div>
      </Container>
    </div>
  );
};

export default Alert;