import { MouseEventHandler } from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    handleClickContact: MouseEventHandler<HTMLDivElement>;
    isRecentMessageFromUser: boolean;
    name: string;
    numUnreadMessages?: number;
    recentText?: string;
}

export const ContactListItem = ({
    className,
    handleClickContact,
    isRecentMessageFromUser,
    name,
    numUnreadMessages = 0,
    recentText,
}: Props) => {
    const displayName = `${isRecentMessageFromUser ? "You: " : ""}${recentText}`;

    return (
        <StyledContact
            key={name}
            className={className}
            data-contactname={name}
            onClick={handleClickContact}
        >
            <StyledContentContainer>
                <StyledContactName>{name}</StyledContactName>
                {recentText && <StyledRecentName>{displayName}</StyledRecentName>}
            </StyledContentContainer>
            {numUnreadMessages > 0 && (
                <StyledBadgeContainer>
                    <StyledBadge>{numUnreadMessages}</StyledBadge>
                </StyledBadgeContainer>
            )}
        </StyledContact>
    );
};

const StyledBadgeContainer = styled.div`
    align-items: center;
    justify-content: flex-end;
    display: flex;
`;

const StyledBadge = styled.div`
    background-color: #ff5757;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: white;
`;

const StyledContentContainer = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    width: 1%;
`;

const StyledRecentName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    color: slategray;
    margin-top: 4px;
`;

const StyledContactName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const StyledContact = styled.div`
    padding: 16px 12px;
    border-radius: 12px;
    text-align: left;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: #f3f6fb;
    }

    &.selected {
        background-color: #f3f6fb;

        ${StyledContactName} {
            font-weight: bold;
        }
    }
`;
